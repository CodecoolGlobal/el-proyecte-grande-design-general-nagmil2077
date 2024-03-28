import {useEffect} from "react";
import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import SideBar from "../Components";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

function Profile() {
    const {id} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser(id);
    }, [id]);

    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.error('Error fetching user details');
            }
        } catch (error) {
            console.error('Error during fetchUser:', error);
        }
    }

    return (
        <div className="container">
            <SideBar/>
            {user &&
                <div>
                    <div>Welcome {user.name}!</div>
                    <Button variant="contained" color="primary" component={Link} to={`/update/${id}`}>
                        Update Profile
                    </Button>
                    {user.roles[0].name === 'admin' &&
                        <>
                            <div>
                                <Button variant="contained" color="primary" component={Link} to={`/users`}>
                                    Manage Users
                                </Button>
                            </div>
                            <div>
                                <Button variant="contained" color="primary">
                                    Schedule Users
                                </Button>
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default Profile
