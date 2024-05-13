import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import SideBar from "../Components";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import UserForm from "../Components/UserForm";

const registerUser = (formData) => {
    return fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then((res) => res.json());
}

const Register = () => {
    const navigate = useNavigate()

    const handleSubmit = (formData) => {
        try {
            registerUser(formData)
                .then(() => {
                    navigate('/');
                });
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <Container>
            <SideBar/>
            <Typography variant="h4" component="h2" sx={{mt: 3, mb: 2}}>
                Registration
            </Typography>
            <UserForm
                onSave={handleSubmit}
                onCancel={() => navigate(`/`)}
            />
        </Container>
    );
};

export default Register;
