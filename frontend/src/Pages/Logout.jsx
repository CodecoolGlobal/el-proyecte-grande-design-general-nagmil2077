import {useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        // try {
        //     const response = await fetch('/api/logout', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type' : 'application/json',
        //             Authorization: `Bearer ${localStorage.getItem('token')}`,
        //         },
        //     });
        //
        //     localStorage.removeItem('token');
        //     navigate('/');
        // } catch (error) {
        //     console.error('Error during logout:', error);
        // }
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
