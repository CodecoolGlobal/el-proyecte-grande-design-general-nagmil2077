import {Outlet, Link} from "react-router-dom";
import Logout from "./Logout";
import SideBar from "../Components/SideBar";
import {Box, Button, Typography} from "@mui/material";

const MainPage = () => (
    <div className="MainPage">

        <nav>
            {localStorage.getItem('token') ? (
                <div>
                    <SideBar />
                </div>
            ) : (

                    <>
                        <Box textAlign="center" mt={5}>
                            <Typography variant="h3" component="h3" gutterBottom>
                                Welcome to the Scheduling App
                            </Typography>
                            <Button variant="contained" color="primary" component={Link} to="/register" sx={{ marginRight: 1 }}>
                                Register
                            </Button>
                            <Button variant="contained" color="primary" component={Link} to="/login">
                                Login
                            </Button>
                        </Box>
                    </>

                
            )}
        </nav>
        <Outlet/>
    </div>
)

export default MainPage;
