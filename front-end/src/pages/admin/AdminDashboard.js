import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  Card,
  CardContent,
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Work,
  People,
  Assessment,
  ExitToApp,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, Routes, Route } from 'react-router-dom';
import JobManagement from './JobManagement';
import UserManagement from './UserManagement';
import { adminService } from '../../services/api';

// StatsCard Component
const StatsCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%', boxShadow: 2, borderRadius: 2 }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={600}>
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>{icon}</Avatar>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null); // Start with null to indicate no data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      const response = await adminService.getDashboardStats();
      setStats(response.data); // Set stats from API response
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
      setError(err.message || 'Failed to fetch dashboard stats');
    } finally {
      setLoading(false); // Stop loading
    }
  };

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

  // Dashboard Content
  const DashboardContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      );
    }

    if (!stats) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6">No data available</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 4 }}>
          Dashboard Overview
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Jobs"
              value={stats.totalJobs || 0}
              icon={<Work fontSize="large" />}
              color="#2196f3"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Users"
              value={stats.totalUsers || 0}
              icon={<People fontSize="large" />}
              color="#ff9800"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Applications"
              value={stats.totalApplications || 0}
              icon={<Assessment fontSize="large" />}
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Pending Applications"
              value={stats.pendingApplications || 0}
              icon={<Assessment fontSize="large" />}
              color="#f44336"
            />
          </Grid>
        </Grid>

        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Recent Activity
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="body2" color="text.secondary">
            No recent activity to display.
          </Typography>
        </Paper>
      </Box>
    );
  };

  // Sidebar Navigation
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
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/jobs" element={<JobManagement />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
