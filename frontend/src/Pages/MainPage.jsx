import {Outlet, Link} from "react-router-dom";

const MainPage = () => (
    <div className="MainPage">
        <h1>Welcome to the Scheduling App</h1>

        <nav>
            {localStorage.getItem('token') ? (
                <div>
                    <div>

                    </div>
                    <br/>
                    <div>

                    </div>
                </div>
            ) : (
                <div>
                    <Link to="/register">
                        <button type="button">Register</button>
                    </Link>
                    <Link to="/login">
                        <button type="button">Login</button>
                    </Link>
                </div>
            )}
        </nav>
        <Outlet/>
    </div>
)

export default MainPage;
