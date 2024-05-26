import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import SideBar from "../Components";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate(`/profile/${data.id}`);
            } else {
                console.error('Authentication failed');
                alert('Wrong e-mail or password! Please try again!');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <>
            <Container>
                <SideBar/>
                <Typography variant="h4" component="h2" sx={{ marginTop: 2 }}>
                    Login
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </div>
                    <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>
                        Sign In
                    </Button>
                    <Button type="button" onClick={() => navigate("/")} variant="contained" sx={{mt: 3, mb: 2}}>
                        Cancel
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default Login;
