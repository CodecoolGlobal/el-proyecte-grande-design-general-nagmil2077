import {Link} from "react-router-dom";
import {Box, Button, ButtonGroup, Typography} from "@mui/material";


function SideBar() {

    return (
        <Box className="sidebar" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2,
                backgroundColor: '#1976d2',
                color: '#fff',
                padding: '8px',
                borderRadius: '4px',
                width: '100%',
                textAlign: 'center' }}>
                Fictional Company
            </Typography>
            <ButtonGroup
                orientation="horizontal"
                aria-label="horizontal basic button group"
                variant="contained"
            >
                <Button component={Link} to="/profile">
                    My profile
                </Button>
                <Button component={Link} to="/scheduler">
                    Schedule maker
                </Button>
                <Button component={Link} to="/logout">
                    Logout
                </Button>
            </ButtonGroup>
        </Box>
    )
}

export default SideBar