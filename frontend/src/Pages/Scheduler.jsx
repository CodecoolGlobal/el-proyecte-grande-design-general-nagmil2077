import SideBar from "../Components/SideBar";
import {useEffect, useState} from "react";

function Scheduler() {
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availableUsers, setAvailableUsers] = useState(new Map());

    const hours = Array.from({ length: 24 }, (_, i) => `${i < 10 ? '0' : ''}${i}:00`);
    const today = new Date().toLocaleDateString();

    async function fetchAvailableUsers(hour, machineId) {
        const response = await fetch(`/api/available-users?machineId=${machineId}&hour=${hour}`);
        const users = await response.json();
        return users;
    }

    async function handleClick(hour, machineIndex) {
        const machineId = machines[machineIndex].id;
        const key = `${machineId}-${hour}`;
        if (!availableUsers.get(key)) {
            const users = await fetchAvailableUsers(hour, machineId);
            setAvailableUsers(new Map(availableUsers.set(key, users)));
        }
    }

    async function handleUserSelection(machineIndex, hour, event) {
        const userId = event.target.value;
        if (!userId) return;

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Authorization token is missing');
            return;
        }

        console.log(`User ${userId} selected for machine ${machines[machineIndex].id} at ${hour}`);

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
        } else {
            console.error('Failed to assign user');
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
            <SideBar />
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>{today}</th>
                        {loading ? (
                            <th>Loading...</th>
                        ) : (
                            machines.map((machine, index) => <th key={index}>{machine.name}</th>)
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {hours.map((hour, hourIndex) => (
                        <tr key={hourIndex}>
                            <td>{hour}</td>
                            {machines.map((machine, machineIndex) => (
                                <td key={machineIndex} onClick={() => handleClick(hour, machineIndex)}>
                                    <select onChange={(e) => handleUserSelection(machineIndex, hour, e)}>
                                        <option value=""></option>
                                        {availableUsers.get(`${machines[machineIndex].id}-${hour}`)?.map(user => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Scheduler