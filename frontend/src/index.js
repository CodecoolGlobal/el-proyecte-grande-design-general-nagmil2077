import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import MainPage from "./Pages/MainPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import Scheduler from "./Pages/Scheduler";
import Logout from "./Pages/Logout";
import Profile from "./Pages/Profile";
import UserUpdater from "./Pages/UserUpdater";
import UserList from "./Pages/UserList";

const router = createBrowserRouter ([
    {
        path: "/",

        children: [
            {
                path: "/",
                element: <MainPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            {
                path: "/scheduler",
                element: <Scheduler />,
            },
            {
                path: "/profile/:id",
                element: <Profile />,
            },
            {
                path: "/users",
                element: <UserList />,
            },
            {
                path: "/update/:id",
                element: <UserUpdater />,
            },
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
