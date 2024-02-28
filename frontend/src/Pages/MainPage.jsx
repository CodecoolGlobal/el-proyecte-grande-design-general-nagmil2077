import {Outlet, Link} from "react-router-dom";
import Logout from "./Logout";
import SideBar from "../Components/SideBar";

const MainPage = () => (
    <div className="MainPage">

        <nav>
            {localStorage.getItem('token') ? (
                <div>
                    <SideBar />
                </div>
            ) : (

                    <>
                        <h1>Welcome to the Scheduling App</h1>
                        <Link to="/register">
                            <button type="button">Register</button>
                        </Link>
                        <Link to="/login">
                            <button type="button">Login</button>
                        </Link>
                    </>

                
            )}
        </nav>
        <Outlet/>
    </div>
)

export default MainPage;
