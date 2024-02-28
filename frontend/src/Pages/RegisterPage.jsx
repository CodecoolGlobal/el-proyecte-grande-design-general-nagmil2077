import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import SideBar from "../Components";

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <>
            <div className="container">
                <SideBar/>
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                               required/>
                    </label>
                    <br/>
                    <button type="submit">Register</button>
                </form>
            </div>

        </>
    );
};

export default Register;
