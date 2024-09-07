import React, { useState } from 'react';
import { TextField, IconButton, Button, InputAdornment, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <Typography 
        variant="h5" 
        component="h5" 
        gutterBottom 
        style={{ textAlign: 'center', marginBottom: 30 }}
      >
        Change Password
      </Typography>

      <div style={{ marginBottom: 20 }}>
        <TextField
          fullWidth
          label="Old Password"
          type={showOldPassword ? 'text' : 'password'}
          placeholder="Enter Old Password*"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowOldPassword}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <TextField
          fullWidth
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          placeholder="Enter New Password*"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowNewPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>

      <div style={{ marginBottom: 30 }}>
        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password*"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{
          borderRadius: 8,
          padding: '12px 0',
          fontWeight: 'bold',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          textTransform: 'none',
          backgroundColor: '#1976d2', // Primary color
          '&:hover': {
            backgroundColor: '#115293', // Darker shade for hover
            boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default ChangePassword;
