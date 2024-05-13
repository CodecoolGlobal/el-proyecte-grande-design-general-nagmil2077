import React, { useState } from "react";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const UserForm = ({ user, onSave, onCancel }) => {
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");

    const onSubmit = (e) => {
        e.preventDefault();

        if (user) {
            return onSave({
                ...user,
                name,
                email,
            });
        }

        return onSave({
            name,
            email,
        });
    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
            >
                <div>
                    <TextField
                        label="Username"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        variant="outlined"
                    />
                </div>
                <Button type="submit" variant="contained" sx={{mt: 3}}>
                    Submit
                </Button>
                <Button type="button" onClick={onCancel} variant="contained" sx={{mt: 3}}>
                    Cancel
                </Button>
            </Box>
        </div>
    )
}

export default UserForm;
