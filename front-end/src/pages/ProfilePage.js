import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
  Box,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Tooltip,
  useTheme
} from '@mui/material';
import { 
  ArrowBack, 
  AccountCircle, 
  Email, 
  Cake, 
  Edit,
  Person,
  Work,
  MonetizationOn
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { userService, jobService } from '../services/api';
import JobCard from '../components/JobCard';

// Styled components for enhanced visual appeal
const PageBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #e0f7fa 0%, #bbdefb 50%, #90caf9 100%)',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8)
}));

const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
  background: '#ffffff',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '120px',
    background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
    zIndex: 0
  }
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  color: '#ffffff',
  paddingBottom: theme.spacing(6)
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  fontSize: '3rem',
  backgroundColor: '#ffffff',
  color: theme.palette.primary.main,
  border: '4px solid #ffffff',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  margin: '0 auto',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const ProfileContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(2)
}));

const ProfileInfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const EditButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
    transform: 'translateY(-2px)'
  }
}));

// EditProfileDialog component with enhanced styling
const EditProfileDialog = ({
  open,
  handleClose,
  profile,
  onProfileUpdated
}) => {
  const [username, setUsername] = useState(profile ? profile.username : '');
  const [email, setEmail] = useState(profile ? profile.email : '');
  const [dob, setDob] = useState(
    profile ? new Date(profile.dob).toISOString().split('T')[0] : ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setEmail(profile.email);
      setDob(new Date(profile.dob).toISOString().split('T')[0]);
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      const updatedData = { username, email, dob };

      const response = await userService.updateProfile(updatedData);
      if (response.status === 'success') {
        onProfileUpdated(response.data);
        handleClose();
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)'
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
        color: 'white',
        fontWeight: 600
      }}>
        Edit Profile
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2, p: 1, bgcolor: '#ffebee', borderRadius: 1 }}>
            {error}
          </Typography>
        )}
        <TextField
          margin="dense"
          label="Username"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: <Person color="primary" sx={{ mr: 1 }} />
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: <Email color="primary" sx={{ mr: 1 }} />
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Date of Birth"
          type="date"
          fullWidth
          variant="outlined"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          InputProps={{
            startAdornment: <Cake color="primary" sx={{ mr: 1 }} />
          }}
          InputLabelProps={{
            shrink: true
          }}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          sx={{ 
            color: theme.palette.text.secondary,
            fontWeight: 500
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ 
            px: 3,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const SavedJobsSection = ({ savedJobs }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Saved Jobs
      </Typography>
      <Grid container spacing={2}>
        {savedJobs && savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard
                job={job}
                isSaved={true}
                onOpenJobDetails={(jobDetail) => {
                  navigate(`/jobs/${jobDetail.id}`);
                }}
                onSkillClick={(skill) =>
                  console.log('Skill clicked:', skill)
                }
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{ textAlign: 'center', pt: 2 }}
            >
              No Saved Jobs
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  // Token check; if none then navigate to login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        if (response.status === 'success') {
          setProfile(response.data);
        } else {
          setErrorProfile('Failed to fetch profile');
        }
      } catch (err) {
        setErrorProfile(err.message || 'Failed to fetch profile');
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  // Fetch saved jobs and applied jobs
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await jobService.getSavedJobs();
        if (response.status === 'success') {
          console.log(response.data);
          const savedJobIds = response.data;
          const jobPromises = savedJobIds.map((id) =>
            jobService.getJobById(id)
          );
          const jobsResponses = await Promise.all(jobPromises);
          const jobsData = jobsResponses.map((res) => res.data);
          setSavedJobs(jobsData);
        }
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await jobService.getUserApplications();
        if (response.status === 'success') {
          setApplications(response.data);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchSavedJobs();
    fetchApplications();
  }, []);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleProfileUpdated = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const renderProfileContent = () => {
    if (loadingProfile) {
      return (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress size={60} thickness={4} sx={{ color: theme.palette.primary.main }} />
        </Box>
      );
    }
    
    if (errorProfile) {
      return (
        <Box 
          sx={{ 
            p: 3, 
            bgcolor: '#ffebee', 
            borderRadius: 2,
            textAlign: 'center',
            my: 4
          }}
        >
          <Typography variant="body1" color="error">
            {errorProfile}
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            sx={{ mt: 2 }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Box>
      );
    }
    
    if (profile) {
      return (
        <ProfileContent>
          <ProfileInfoItem>
            <Email color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="caption" color="textSecondary">
                Email Address
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {profile.email}
              </Typography>
            </Box>
          </ProfileInfoItem>
          
          <ProfileInfoItem>
            <Cake color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="caption" color="textSecondary">
                Date of Birth
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {new Date(profile.dob).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Box>
          </ProfileInfoItem>
          
          <Box display="flex" justifyContent="center" mt={4}>
            <EditButton
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={handleEditClick}
            >
              Edit Profile
            </EditButton>
          </Box>
        </ProfileContent>
      );
    }
  };

  return (
    <PageBackground>
      <Container maxWidth="md">
        {/* Back navigation header */}
        <Box display="flex" alignItems="center" mb={3}>
          <StyledIconButton onClick={handleGoBack} size="medium">
            <ArrowBack />
          </StyledIconButton>
          <Typography variant="h6" ml={1} fontWeight={500} color="primary.dark">
            Back to Dashboard
          </Typography>
        </Box>
        
        <ProfileContainer>
          <ProfileHeader>
            <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
              My Profile
            </Typography>
          </ProfileHeader>
          
          {profile && (
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
              <ProfileAvatar>
                {profile.username ? profile.username.charAt(0).toUpperCase() : <AccountCircle />}
              </ProfileAvatar>
              <Typography variant="h4" fontWeight={600}>
                {profile.username}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Account Member
              </Typography>
            </Box>
          )}
          
          <Divider sx={{ mb: 4 }} />
          
          {renderProfileContent()}
        </ProfileContainer>

        {/* Using the SavedJobsSection component */}
        <SavedJobsSection savedJobs={savedJobs} />

        {/* Section: Applied Jobs */}
        <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Applied Jobs
          </Typography>
          <Grid container spacing={2}>
            {applications && applications.length > 0 ? (
              applications.map((app) => (
                <Grid item xs={12} key={app.id}>
                  <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Job ID: {app.job_id}
                    </Typography>
                    <Typography variant="body2">
                      Status: {app.status}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Applied on: {new Date(app.created_at).toLocaleDateString()}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography variant="body1">No Applied Jobs</Typography>
            )}
          </Grid>
        </Container>
      </Container>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={editDialogOpen}
        handleClose={handleDialogClose}
        profile={profile}
        onProfileUpdated={handleProfileUpdated}
      />
    </PageBackground>
  );
};

export default ProfilePage;
