import SideBar from "../Components/SideBar";

function Scheduler() {
    // Define the hours
    const hours = Array.from({ length: 24 }, (_, i) => `${i < 10 ? '0' : ''}${i}:00`);

    // Define the machines
    const machines = ['Machine 1', 'Machine 2', 'Machine 3'];

    // Get today's date
    const today = new Date().toLocaleDateString();

    function handleClick(hour, machine)  {
        console.log(`Clicked on cell: Hour ${hour}, Machine ${machine}`);
    }

    return (
        <div className="container">
            <SideBar/>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>{today}</th>
                        {machines.map((machine, index) => (
                            <th key={index}>{machine}</th>
                        ))}
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