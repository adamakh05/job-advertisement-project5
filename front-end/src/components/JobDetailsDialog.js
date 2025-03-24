import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';

const JobDetailsDialog = ({ selectedJob, onClose, onApplyClick }) => {
  if (!selectedJob) return null;
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <Dialog 
      open={Boolean(selectedJob)} 
      onClose={onClose} 
      fullWidth 
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" component="div" fontWeight="bold">
          {selectedJob.title}
        </Typography>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Job Overview Section */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={2}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    bgcolor: 'primary.light', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: 2
                  }}
                >
                  <BusinessIcon fontSize="large" sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedJob.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posted on {selectedJob.created_at ? formatDate(selectedJob.created_at) : 'N/A'}
                  </Typography>
                </Box>
              </Stack>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {selectedJob.location || 'Location not specified'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WorkIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {selectedJob.type || 'Job type not specified'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {selectedJob.salary || 'Salary not specified'}
                    </Typography>
                  </Box>
                </Grid>
                
              </Grid>
            </Paper>
          </Grid>
          
          {/* Job Description Section */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Job Description
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {selectedJob.description || 'No description provided.'}
            </Typography>
          </Grid>
          
          {/* Requirements Section */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Requirements
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {selectedJob.requirements || 'No specific requirements provided.'}
            </Typography>
          </Grid>
          
          {/* Skills Section */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Required Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {(selectedJob.skills || '')
                .toString()
                .split(',')
                .filter(skill => skill.trim().length > 0)
                .map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.trim()}
                    color="primary"
                    variant="outlined"
                    size="medium"
                  />
                ))}
              {!(selectedJob.skills || '').toString().trim() && (
                <Typography variant="body2" color="text.secondary">
                  No specific skills listed.
                </Typography>
              )}
            </Box>
          </Grid>
          
          {/* Benefits Section (if available) */}
          {selectedJob.benefits && (
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Benefits
              </Typography>
              <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {selectedJob.benefits}
              </Typography>
            </Grid>
          )}
          
          {/* Application Instructions (if available) */}
          {selectedJob.application_instructions && (
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                How to Apply
              </Typography>
              <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {selectedJob.application_instructions}
              </Typography>
            </Grid>
          )}
          
          {/* Contact Information (if available) */}
          {selectedJob.contact_email && (
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1">
                Email: {selectedJob.contact_email}
              </Typography>
              {selectedJob.contact_phone && (
                <Typography variant="body1">
                  Phone: {selectedJob.contact_phone}
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="primary" variant="outlined">
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => onApplyClick(selectedJob.id)}
          sx={{ px: 4 }}
        >
          Apply Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobDetailsDialog;
