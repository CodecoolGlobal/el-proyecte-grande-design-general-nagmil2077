import SideBar from "../Components/SideBar";
import {useEffect, useState} from "react";
import useAvailableUsersStore from "../Stores/UserStore";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function Scheduler() {
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [availableUsers, setAvailableUsers] = useState(new Map());
    const {availableUsers, selectedUsers, fetchAvailableUsers, removeUserFromDropdowns, setSelectedUser} = useAvailableUsersStore();
    const hours = Array.from({length: 24}, (_, i) => `${i < 10 ? '0' : ''}${i}:00`);
    const today = new Date().toLocaleDateString();

    const store = useAvailableUsersStore();
    console.log(store);
    async function handleClick(hour, machineIndex) {
        const machineId = machines[machineIndex].id;
        await fetchAvailableUsers(machineId, hour);
    }
    async function resetMachineAssignment(machineId, hour) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Authorization token is missing');
            return;
        }
        try {
            const response = await fetch(`/api/reset-assignment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    machineId,
                    hour,
                }),
            });

            if (response.ok) {
                console.log('Machine assignment reset successfully');
                fetchAvailableUsers(machineId, hour);
                setSelectedUser(machineId, hour, null);
            } else {
                console.error('Failed to reset machine assignment');
            }
        } catch (error) {
            console.error(error.message);
        }
    }


    async function handleUserSelection(machineIndex, hour, event) {
        console.log(`event: ${event.target.value}`);
        if (event.target.value === "reset") {
            await resetMachineAssignment(machines[machineIndex].id, hour);
        } else {
            const userId = event.target.value;
            const machineId = machines[machineIndex].id;
            if (!userId) return;

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Authorization token is missing');
                return;
            }


            console.log(`User ${userId} selected for machine ${machines[machineIndex].id} at ${hour}`);

            try {
                const response = await fetch('/api/assign-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        userId,
                        machineId: machines[machineIndex].id,
                        hour,
                    }),
                });

                if (response.ok) {
                    console.log('User assigned successfully');
                    removeUserFromDropdowns(userId, hour);
                    setSelectedUser(machineId, hour, userId);
                } else {
                    console.error('Failed to assign user');
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    async function fetchMachines() {
        const response = await fetch('/api/machinenames');
        const data = await response.json();
        setMachines(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchMachines();
    }, []);

    return (
        <div className="container">
            <SideBar/>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{today}</TableCell>
                            {loading ? (
                                <TableCell>Loading...</TableCell>
                            ) : (
                                machines.map((machine, index) => (
                                    <TableCell key={index}>{machine.name}</TableCell>
                                ))
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hours.map((hour, hourIndex) => (
                            <TableRow key={hourIndex}>
                                <TableCell component="th" scope="row">
                                    {hour}
                                </TableCell>
                                {machines.map((machine, machineIndex) => {
                                    const key = `${machine.id}-${hour}`;
                                    const selectedUserId = selectedUsers.get(key);
                                    const selectedUser = availableUsers.get(key)?.find(user => user.id === selectedUserId);
                                    {console.log(`selectedUser: ${selectedUserId}`)}
                                    return (
                                        <TableCell key={machineIndex} onClick={() => handleClick(hour, machineIndex)}>
                                            {selectedUser ? (
                                                <span>{selectedUser.name}</span>
                                            ) : (
                                                <select onChange={(e) => handleUserSelection(machineIndex, hour, e)}
                                                        defaultValue="">
                                                    <option value="" disabled>Select User</option>
                                                    <option value="reset">Reset Machine</option>
                                                    {availableUsers.get(key)?.map(user => (
                                                        <option key={user.id} value={user.id}>{user.name}</option>
                                                    ))}
                                                </select>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default Scheduler