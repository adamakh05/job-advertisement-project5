import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Button
} from '@mui/material';

const PostJobForm = ({ onPostJob }) => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    skills: [],
    salary: '',
    description: '',
    requirements: '',
  });

  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if all fields are filled
    if (!jobDetails.title || !jobDetails.company || !jobDetails.location || !jobDetails.type || !jobDetails.skills.length || !jobDetails.salary || !jobDetails.description || !jobDetails.requirements) {
      setError('All fields are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(jobDetails),
      });
      const data = await response.json();

      if (data.status === 'success') {
        onPostJob(data.data);
        alert('Job posted successfully!');
      } else {
        setError('Failed to post job');
      }
    } catch (err) {
      setError('An error occurred while posting the job');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <TextField
        label="Job Title"
        fullWidth
        value={jobDetails.title}
        onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })}
        required
        margin="normal"
      />
      <TextField
        label="Company"
        fullWidth
        value={jobDetails.company}
        onChange={(e) => setJobDetails({ ...jobDetails, company: e.target.value })}
        required
        margin="normal"
      />
      <TextField
        label="Location"
        fullWidth
        value={jobDetails.location}
        onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })}
        required
        margin="normal"
      />
      <FormControl fullWidth required margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          value={jobDetails.type}
          onChange={(e) => setJobDetails({ ...jobDetails, type: e.target.value })}
        >
          <MenuItem value="FULL_TIME">Full-time</MenuItem>
          <MenuItem value="PART_TIME">Part-time</MenuItem>
          <MenuItem value="CONTRACT">Contract</MenuItem>
          <MenuItem value="INTERNSHIP">Internship</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        multiple
        options={['React', 'Node.js', 'JavaScript', 'CSS', 'Python', 'Java']}
        value={jobDetails.skills}
        onChange={(e, newValue) => setJobDetails({ ...jobDetails, skills: newValue })}
        renderInput={(params) => <TextField {...params} label="Skills" margin="normal" />}
      />
      <TextField
        label="Salary"
        fullWidth
        value={jobDetails.salary}
        onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })}
        required
        margin="normal"
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        value={jobDetails.description}
        onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })}
        required
        margin="normal"
      />
      <TextField
        label="Requirements"
        multiline
        rows={4}
        fullWidth
        value={jobDetails.requirements}
        onChange={(e) => setJobDetails({ ...jobDetails, requirements: e.target.value })}
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Post Job
      </Button>
    </form>
  );
};

export default PostJobForm;
