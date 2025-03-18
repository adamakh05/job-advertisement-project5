import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ApplyJobDialog = ({ 
  open, 
  onClose, 
  applicationData, 
  setApplicationData, 
  onSubmit,
  isSubmitting
}) => {
  const [fileError, setFileError] = useState('');
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Check file type
      const validTypes = ['.pdf', '.doc', '.docx'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!validTypes.includes(fileExt)) {
        setFileError('Invalid file type. Only PDF, DOC, and DOCX files are allowed.');
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size exceeds 5MB limit.');
        return;
      }
      
      setFileError('');
      setApplicationData(prev => ({...prev, cv: file}));
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Apply Now</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Full Name"
          value={applicationData.name}
          onChange={(e) => setApplicationData(prev => ({...prev, name: e.target.value}))}
          sx={{ mb: 2 }}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={applicationData.email}
          onChange={(e) => setApplicationData(prev => ({...prev, email: e.target.value}))}
          sx={{ mb: 2 }}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Cover Letter"
          multiline
          rows={4}
          value={applicationData.coverLetter}
          onChange={(e) => setApplicationData(prev => ({...prev, coverLetter: e.target.value}))}
          sx={{ mb: 2 }}
          margin="normal"
          required
        />
        
        <Box sx={{ mb: 2, mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload CV (PDF, DOC, DOCX - Max 5MB)
          </Typography>
          
          <input
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
            id="cv-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="cv-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              {applicationData.cv ? applicationData.cv.name : 'Select CV File'}
            </Button>
          </label>
          
          {fileError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {fileError}
            </Alert>
          )}
          
          {applicationData.cv && !fileError && (
            <Alert severity="success" sx={{ mt: 1 }}>
              File selected: {applicationData.cv.name}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={onSubmit} 
          variant="contained"
          disabled={isSubmitting || fileError}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyJobDialog;
