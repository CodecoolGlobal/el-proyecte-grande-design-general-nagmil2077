import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import SideBar from "../Components";
import UserForm from "../Components/UserForm"
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const updateUser = (user) => {
    return fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(user),
    }).then((res) => res.json());
};

const UserUpdater = () => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        fetchUser(id);
    }, [id]);

    const handleUpdateUser = (user) => {
        updateUser(user)
            .then(() => {
                navigate(`/profile/${id}`);
            });
    };

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
                <UserForm
                    user={user}
                    onSave={handleUpdateUser}
                    onCancel={() => navigate(`/profile/${id}`)}
                />
            }
        </div>
    )
}

export default UserUpdater;
