import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Avatar, Divider, Box, CircularProgress } from '@mui/material';
import { AccountCircle, Email, Person, Phone, CalendarToday } from '@mui/icons-material';
import { deepOrange } from '@mui/material/colors';
import { getUserByIdAPI } from "../../API/users/getUserbyID";

const UserView = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) {
                setError('No user ID provided');
                setLoading(false);
                return;
            }

            const response = await getUserByIdAPI(userId);
            if (response.error) {
                setError(response.error);
            } else {
                setUser(response.data.user);
            }
            setLoading(false);
        };

        fetchUser();
    }, [userId]);

    const getInitials = (name) => {
        if (!name) return '';
        const names = name.split(' ');
        return names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0][0];
    };

    if (loading) {
        return (
            <Box sx={{ width: '100%', p: 3, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="h6" mt={2}>Loading user data...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ width: '100%', p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="error">Error: {error}</Typography>
            </Box>
        );
    }

    if (!user) {
        return (
            <Box sx={{ width: '100%', p: 3, textAlign: 'center' }}>
                <Typography variant="h6">No user data found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Box textAlign="center" mb={3}>
                <Avatar
                    sx={{ 
                        width: 100, 
                        height: 100, 
                        bgcolor: user.image ? 'transparent' : deepOrange[500],
                        fontSize: '3rem',
                        margin: 'auto',
                    }}
                    src={user.image || undefined}
                >
                    {!user.image && getInitials(user.name)}
                </Avatar>
                <Typography variant="h5" mt={2}>{user.name}</Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
                View User Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={user.username || ''}
                            InputProps={{
                                startAdornment: <AccountCircle sx={{ mr: 1 }} />,
                            }}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={user.email || ''}
                            InputProps={{
                                startAdornment: <Email sx={{ mr: 1 }} />,
                            }}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Role"
                            value={user.role || ''}
                            InputProps={{
                                startAdornment: <Person sx={{ mr: 1 }} />,
                            }}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={user.gender || ''}
                                label="Gender"
                                disabled
                                renderValue={(value) => (
                                    <Typography variant="body1">{value}</Typography>
                                )}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={user.phoneNo || ''}
                            InputProps={{
                                startAdornment: <Phone sx={{ mr: 1 }} />,
                            }}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Join Date"
                            value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                            InputProps={{
                                startAdornment: <CalendarToday sx={{ mr: 1 }} />,
                            }}
                            disabled
                        />
                    </Grid>
                    {/* Conditionally render additional fields for doctors */}
                    {user.role === 'doctor' && (
                        <>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Speciality"
                                    value={user.speciality || ''}
                                    InputProps={{
                                        startAdornment: <Person sx={{ mr: 1 }} />, // You can use an appropriate icon
                                    }}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Medical License"
                                    value={user.medicalLicense || ''}
                                    InputProps={{
                                        startAdornment: <Person sx={{ mr: 1 }} />, // You can use an appropriate icon
                                    }}
                                    disabled
                                />
                            </Grid>
                        </>
                    )}
                </Grid>
            </form>
        </Box>
    );
};

export default UserView;
