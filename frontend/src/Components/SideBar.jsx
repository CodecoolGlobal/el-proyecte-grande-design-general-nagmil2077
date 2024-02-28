import {Link} from "react-router-dom";


function SideBar() {

    return (
        <div className="sidebar">
            <h2>Fictional Company</h2>
            <div>
                <Link to="/profile">My profile</Link>
            </div>
            <div>
                <Link to="/scheduler">Schedule maker</Link>
            </div>
            <div>
                <Link to='/logout'>Logout</Link>
            </div>
        </div>
    )
}

export default SideBar