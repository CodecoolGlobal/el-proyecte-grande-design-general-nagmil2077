import {Outlet, Link} from "react-router-dom";
import Logout from "./Logout";
import SideBar from "../Components/SideBar";
import {Box, Button, CardMedia, Typography} from "@mui/material";

const MainPage = () => (
    <div className="MainPage">

        <nav>
            {localStorage.getItem('token') ? (
                <>
                    <SideBar />
                    <CardMedia
                        component="img"
                        image="https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWZmaWNpZW50fGVufDB8fDB8fHww"
                        alt="Efficient workspace"
                        sx={{
                            width: '80vw',
                            maxWidth: '80vw',
                            height: 'auto',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    />
                </>
            ) : (
                <>
                    <Box textAlign="center" mt={5}>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                mb: 2,
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                padding: '8px',
                                borderRadius: '4px',
                                width: '100%',
                                textAlign: 'center',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                },
                            }}
                        >
                            Welcome to the Scheduling App
                        </Typography>
                        <Button variant="contained" color="primary" component={Link} to="/register" sx={{ marginRight: 1 }}>
                            Register
                        </Button>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                        </Button>
                    </Box>
                    <CardMedia
                        component="img"
                        image="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNjaGVkdWxlfGVufDB8fDB8fHww"
                        alt="Scheduling concept"
                        sx={{
                            width: '80vw',
                            maxWidth: '80vw',
                            height: 'auto',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '20px'
                        }}
                    />
                </>
            )}
        </nav>
        <Outlet/>
    </div>
)

export default MainPage;
