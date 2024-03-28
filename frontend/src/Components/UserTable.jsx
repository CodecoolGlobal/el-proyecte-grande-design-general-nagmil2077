import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const UserTable = ({ users, onDelete, onCancel }) => (
    <div className="EmployeeTable">
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>E-Mail</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link to={`/update/${user.id}`}>
                            <button type="button">Update</button>
                        </Link>
                        <button type="button" onClick={() => onDelete(user.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
)

export default UserTable;
