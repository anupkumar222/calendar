import React from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, InputBase, Box, Avatar, Menu, MenuItem, Badge
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './App.css';
import NotesIcon from '@mui/icons-material/Notes';

function EnhancedHeader() {

    return (
        <AppBar position="static" elevation={0} sx={{ background: '#ffff' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <NotesIcon sx={{ mr: 2, fontSize: '2rem', color: 'black' }} />
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'black' }}>
                            Appointments
                        </Typography>
                    </Box>

                    <Typography sx={{ color: 'black', fontSize: '0.9rem', mt: 1 }}>
                        Tuesday, 7 November 2023
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>


                    <InputBase
                        placeholder="Search…"
                        sx={{
                            ml: 1, flex: 1, color: 'black', border: '1px solid black',
                            borderRadius: '50px',
                            padding: '4px 12px',
                        }}
                    />
                    <Box
                        sx={{
                            color: 'black',
                            mx: 2,
                            border: '1px solid black',
                            borderRadius: '50px',
                            padding: '4px 12px',
                            display: 'flex',
                            justifyContent: 'space-between'

                        }}
                        size="large"
                    >
                        <Avatar
                            src="https://cdn.pixabay.com/photo/2013/07/13/12/03/flag-159070_640.png"
                            alt="Britain Flag"
                            sx={{ width: 20, height: 20, mr: 1 }}
                        />
                        <Typography>EN</Typography>
                    </Box >
                    <IconButton sx={{
                        color: 'black',
                        border: '1px solid black',
                        borderRadius: '50px',
                        padding: '4px 4px'
                    }} size="large">
                        <NotificationsIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default EnhancedHeader;
