const Logout = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            localStorage.removeItem('token');
            window.location.href = '/';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
