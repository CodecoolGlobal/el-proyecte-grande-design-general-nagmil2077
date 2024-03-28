import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import SideBar from "../Components";
import UserTable from "../Components/UserTable";

const fetchUsers = () => {
    return fetch("/api/users", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }).then((res) => res.json());
}

const deleteUser = (id) => {
    return fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }).then((res) => res.json());
}

const UserList = () => {
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers()
            .then((users) => {
                setUsers(users);
            })
    }, []);

    const handleDelete = (id) => {
        deleteUser(id);

        setUsers((users) => {
            return users.filter((user) => user.id !== id);
        });
    };

    return (
        <div className="container">
            <SideBar/>
            {users &&
                <UserTable
                    users={users}
                    onDelete={handleDelete}
                    onCancel={() => navigate(`/profile/${id}`)}
                />
            }
        </div>
    )
}

export default UserList;
