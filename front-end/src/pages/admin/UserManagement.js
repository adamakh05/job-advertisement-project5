import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  AppBar,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import {
  Delete,
  Search,
  VisibilityOff,
  Dashboard as DashboardIcon,
  Work,
  People,
  Assessment,
  ExitToApp,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Sidebar state
  const [selectedItem, setSelectedItem] = useState('users');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllUsers();
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await adminService.deleteUser(userToDelete.id);
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setSnackbar({
        open: true,
        message: 'User deleted successfully',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to delete user',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Sidebar navigation handlers
  const handleNavItemClick = (item) => {
    setSelectedItem(item);
    if (item === 'jobs') {
      navigate('/admin/jobs');
    } else if (item === 'users') {
      navigate('/admin/users');
    } else if (item === 'dashboard') {
      navigate('/admin/dashboard');
    } else if (item === 'logout') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('token');
      navigate('/admin/login');
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Sidebar Component
  const Sidebar = () => (
    <Box sx={{ width: '100%', maxWidth: 280 }}>
      <Paper
        sx={{
          height: '100%',
          borderRadius: 0,
          position: 'fixed',
          width: 280,
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            p: 3,
            bgcolor: '#f44336',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <DashboardIcon />
          <Typography variant="h6" fontWeight={600}>
            Admin Portal
          </Typography>
        </Box>
        <Divider />
        <List component="nav">
          <ListItem
            button
            selected={selectedItem === 'dashboard'}
            onClick={() => handleNavItemClick('dashboard')}
            sx={{
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: '#fbe9e7',
                '&:hover': {
                  bgcolor: '#fbe9e7',
                },
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon color={selectedItem === 'dashboard' ? 'error' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            selected={selectedItem === 'jobs'}
            onClick={() => handleNavItemClick('jobs')}
            sx={{
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: '#fbe9e7',
                '&:hover': {
                  bgcolor: '#fbe9e7',
                },
              },
            }}
          >
            <ListItemIcon>
              <Work color={selectedItem === 'jobs' ? 'error' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItem>
          <ListItem
            button
            selected={selectedItem === 'users'}
            onClick={() => handleNavItemClick('users')}
            sx={{
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: '#fbe9e7',
                '&:hover': {
                  bgcolor: '#fbe9e7',
                },
              },
            }}
          >
            <ListItemIcon>
              <People color={selectedItem === 'users' ? 'error' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <Divider sx={{ my: 1 }} />
          <ListItem button onClick={() => handleNavItemClick('logout')} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Main content
  const UserContent = () => (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={600}>
          User Management
        </Typography>
        <TextField
          placeholder="Search users..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
          }}
          sx={{ width: 250 }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><Typography fontWeight={600}>ID</Typography></TableCell>
                <TableCell><Typography fontWeight={600}>Username</Typography></TableCell>
                <TableCell><Typography fontWeight={600}>Email</Typography></TableCell>
                <TableCell><Typography fontWeight={600}>Joined</Typography></TableCell>
                <TableCell><Typography fontWeight={600}>Applications</Typography></TableCell>
                <TableCell><Typography fontWeight={600}>Status</Typography></TableCell>
                <TableCell align="right"><Typography fontWeight={600}>Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user.applicationCount || 0}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status || 'Active'} 
                      size="small" 
                      color={user.status === 'Inactive' ? 'default' : 'success'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      color="primary" 
                      onClick={() => {/* View user profile */}}
                    >
                      <VisibilityOff fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => handleDeleteClick(user)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">
                      No users found matching your search
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user "{userToDelete?.username}" ({userToDelete?.email})? This action cannot be undone and will remove all their applications and saved jobs.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isMobile ? (
        <AppBar position="fixed" sx={{ bgcolor: '#f44336' }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Admin Portal
            </Typography>
          </Toolbar>
        </AppBar>
      ) : (
        <Sidebar />
      )}

      <Box
        sx={{
          flexGrow: 1,
          ml: isMobile ? 0 : '280px',
          mt: isMobile ? '64px' : 0,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Container maxWidth="xl">
          <UserContent />
        </Container>
      </Box>
    </Box>
  );
};

export default UserManagement;
