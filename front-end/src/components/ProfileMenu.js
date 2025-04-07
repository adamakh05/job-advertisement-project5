import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('token');
    handleClose();
    navigate('/');
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen} size="large">
        <AccountCircle />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
