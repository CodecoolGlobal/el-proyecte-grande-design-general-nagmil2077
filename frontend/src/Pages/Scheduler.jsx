import SideBar from "../Components/SideBar";
import {useEffect, useState} from "react";

function Scheduler() {
    const [machines, setMachines] = useState([])
    const [loading, setLoading] = useState(true)

    const hours = Array.from({ length: 24 }, (_, i) => `${i < 10 ? '0' : ''}${i}:00`);

    const today = new Date().toLocaleDateString();

    function handleClick(hour, machine)  {
        console.log(`Clicked on cell: Hour ${hour}, Machine ${machines[machine].name}`);
    }

    async function fetchMachines() {
        const response = await fetch('/api/machinenames')
        const data = await response.json()
        setMachines(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchMachines()
    }, []);

    return (
        <div className="container">
            <SideBar/>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>{today}</th>
                        {loading ? (
                            <th>Loading...</th>
                        ) : (
                            machines.map((machine, index) => (
                                <th key={index}>{machine.name}</th>
                            ))
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {hours.map((hour, hourIndex) => (
                        <tr key={hourIndex}>
                            <td>{hour}</td>
                            {machines.map((_, machineIndex) => (
                                <td key={machineIndex} onClick={() => handleClick(hour, machineIndex)}>
                                    {/* You can put your content for each cell here */}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default Scheduler