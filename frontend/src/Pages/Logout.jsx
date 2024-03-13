import {useNavigate} from "react-router-dom";
import {Box, Button} from "@mui/material";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem('token');
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" p={3}>
            <Button variant="contained" onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    );
};

export default Logout;
