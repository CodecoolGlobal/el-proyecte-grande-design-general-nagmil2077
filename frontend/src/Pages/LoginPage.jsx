import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import SideBar from "../Components";

const Login = () => {

    const navigate = useNavigate()
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
                navigate('/');
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
            <div className="container">
                <SideBar/>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Sign In</button>
                </form>
            </div>

        </>
    );
};

export default Login;
