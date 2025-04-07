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
  Chip,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
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
  Edit,
  Add,
  Search,
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

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  // Sidebar state
  const [selectedItem, setSelectedItem] = useState('jobs');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllJobs();
      setJobs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await adminService.deleteJob(jobToDelete.id);
      setJobs(jobs.filter((job) => job.id !== jobToDelete.id));
      setSnackbar({
        open: true,
        message: 'Job deleted successfully',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to delete job',
        severity: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
      setJobToDelete(null);
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

  const filteredJobs = Array.isArray(jobs)
    ? jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Main content
  const JobContent = () => (
    <Box sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={600}>
          Job Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search jobs..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
            }}
            sx={{ width: 250 }}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              // Add job functionality
            }}
          >
            Add Job
          </Button>
        </Box>
      </Box>

      {/* Loading, Error, or Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={600}>Title</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Company</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Location</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Salary</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Skills</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id} hover>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={job.type}
                      size="small"
                      color={job.type === 'FULL_TIME' ? 'primary' : 'default'}
                    />
                  </TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 200 }}>
                      {job.skills.split(',').slice(0, 2).map((skill, i) => (
                        <Chip key={i} label={skill.trim()} size="small" variant="outlined" />
                      ))}
                      {job.skills.split(',').length > 2 && (
                        <Chip label={`+${job.skills.split(',').length - 2}`} size="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => {
                        // Edit job functionality
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(job)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredJobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">
                      No jobs found matching your search
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the job "{jobToDelete?.title}" from{' '}
            {jobToDelete?.company}? This action cannot be undone.
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
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
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
          <JobContent />
        </Container>
      </Box>
    </Box>
  );
};

export default JobManagement;
