// imports from react
import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Avatar,
  Chip,
  Container,
  Drawer,
  Divider,
  IconButton,
  useMediaQuery,
  Tooltip,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  Work,
  MonetizationOn,
  Search,
  BookmarkBorder,
  Bookmark,
  Share,
  Close,
  ExpandMore,
  FilterList,
  Upload
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// filters available to user
const defaultFilters = {
  type: '',
  location: '',
  salary: 0,
  skills: [],
};
const allSkills = ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript', 'Node.js']; // skills available to user

const parseSalary = (salaryStr) => {
  const match = salaryStr.match(/\$?(\d+)[kK]/); //pattern which salary must match. may contain dollar sign, contains digits, may contain k to represent 'thousand'
  return match ? parseInt(match[1]) * 1000 : 0; // multiplies input by 1000 if input contains k
};

// applies custom CSS to a card component
const StyledCard = motion(styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  // features which will occur when mouse hovers over card. the card will slightly move up and will have a 'stronger' shadow
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
  },
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  position: 'relative',
})));

// custom style for box component
const HeaderBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, // gradient background
  padding: theme.spacing(4, 2, 8),
  color: theme.palette.common.white, // text displayed in white
  position: 'relative',
  overflow: 'hidden',
}));

const SearchBox = styled(motion.div)(({ theme }) => ({
  background: theme.palette.background.paper, // light background
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2, // rounded corners on search box
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(2),
  position: 'relative',
  zIndex: 1,
}));

// specifies components of the job card including: background, image logo, save job,
const JobCard = ({ job, isSaved, onToggleSave, onOpenJobDetails, onSkillClick }) => {
  return (
    <StyledCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="160"
          image={job.image}
          alt={job.title}
          sx={{ objectPosition: 'top' }}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/400x200?text=No+Image')}
        />
          
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={() => onToggleSave(job.id)}
          aria-label={isSaved ? "Remove saved job" : "Save job"}
        >
          {isSaved ? <Bookmark color="primary" /> : <BookmarkBorder sx={{ color: 'common.white' }} />}
        </IconButton>
      </Box>
// sets text components such as, job title and company
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={job.logo}
            sx={{ width: 48, height: 48, mr: 2 }}
            alt={`${job.company} logo`}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {job.company}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.location}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          {job.title}
        </Typography>
// box component to show the required skills for job
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {String(job.skills).split(',').slice(0, 3).map((skill, i) => (
            <Chip
              key={i}
              label={skill.trim()}
              size="small"
              variant="outlined"
              onClick={() => onSkillClick(skill.trim())}
              clickable
              sx={{ cursor: 'pointer' }}
            />
          ))}

          {String(job.skills).split(',').length > 3 && (
            <Tooltip title={String(job.skills).split(',').slice(3).join(', ')}>
              <Chip label={`+${String(job.skills).split(',').length - 3}`} size="small" />
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />
// component to show the job type and salary offered
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Work sx={{ mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2">{job.type}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MonetizationOn sx={{ mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2">{job.salary}</Typography>
          </Box>
        </Box>
      </CardContent>
// button which opens job details page
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          endIcon={<ExpandMore />}
          onClick={() => onOpenJobDetails(job)}
          aria-label="View job details"
        >
          View Details
        </Button>
      </Box>
    </StyledCard>
  );
};
// variables
const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [selectedJob, setSelectedJob] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    coverLetter: ''
  });
// fetches job listings based on filters entered
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const queryParams = {};
        if (searchTerm) queryParams.search = searchTerm;
        if (filters.type) queryParams.type = filters.type;
        if (filters.location) queryParams.location = filters.location;
        if (filters.salary > 0) queryParams.salary = Math.floor(filters.salary / 1000);
        if (filters.skills.length > 0) queryParams.skills = filters.skills.join(',');

        console.log(queryParams);
        const response = await fetch(`http://localhost:5000/api/jobs?${new URLSearchParams(queryParams)}`);
        
        const data = await response.json();
        
        if (data.status === 'success') {
          setJobs(data.data);
          setError(null);
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchTerm, filters]);

  // sets saved jobs into state
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return; // ensures user is logged in

        const response = await fetch('/api/saved-jobs', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.status === 'success') {
          setSavedJobs(new Set(data.data.map(id => parseInt(id))));
        }
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchSavedJobs();
  }, []);
// button for when user wants to apply to job, opens application dialog
  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setApplyDialogOpen(true);
  };
  
  const handleApplicationSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // confirms user is logged in
      if (!token) {
        setSnackbarOpen(true); // error message, confirming to users they must be logged in
        return;
      }

      const response = await fetch(`http://localhost:5000/api/jobs/${selectedJobId}/apply`, {
        method: 'POST', // submitting data
        headers: {
          'Authorization': `Bearer ${token}`, // ensure user is logged in
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // submits user's name, email and cover letter
          name: applicationData.name,
          email: applicationData.email,
          coverLetter: applicationData.coverLetter
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setSnackbarOpen(true); // show 'application successful' message.
        setApplyDialogOpen(false); // close form
        setApplicationData({ // reset to default (empty)
          name: '',
          email: '',
          coverLetter: ''
        });
      } else {
        console.error('Application error:', data.message);
      }
    } catch (error) {
      console.error('Application error:', error);
    }
  };
// save/unsave a job
  const toggleSaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token'); // ensures user is logged in
      if (!token) {
        setSnackbarOpen(true); // error message, user must be logged in.
        return;
      }

      const response = await fetch(`/api/jobs/${jobId}/save`, {
        method: 'POST', // sends job ID data to savedjobs table
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.status === 'success') {
        setSavedJobs(prev => new Set(prev.has(jobId) ? //adds/removes jobID from set
          [...prev].filter(id => id !== jobId) : 
          [...prev, jobId]
        ));
        setSnackbarOpen(true); // sends success message to the user
      } else {
        console.error('Error toggling save:', data.message);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  // Memoized job filtering - will only recompute the filtered list when changes are made to filters
  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        const searchMatch = `${job.title} ${job.company}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()); // checks to see if job title or company has a match
        const typeMatch = !filters.type || job.type === filters.type; // checks if jobs match the filtered type, if a type has been selected
        const locationMatch =
          !filters.location ||
          job.location.toLowerCase().includes(filters.location.toLowerCase()); // checks to see if jobs match the location filter
        const salaryMatch = parseSalary(job.salary) >= filters.salary; // checks to see if jo contains salary greater or equal to filter
        const skillsMatch =
          !filters.skills.length ||
          filters.skills.every((skill) => job.skills.includes(skill)); // checks to see if jobs match the skills filter
        return searchMatch && typeMatch && locationMatch && salaryMatch && skillsMatch; // returns available jobs
      }),
    [jobs, searchTerm, filters]
  );


  const toggleDrawer = (open) => () => setIsDrawerOpen(open); // determines state of side panel
  const openJobDetails = (job) => setSelectedJob(job); // displays specific job details
  const closeJobDetails = () => setSelectedJob(null); // resets above variable to null
  const addSkillFilter = (skill) =>
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills : [...prev.skills, skill],
    })); // adds skill to filter list
  const clearFilters = () => { // clears filters
    setFilters(defaultFilters);
    setSearchTerm('');
  };
  const handleSnackbarClose = () => setSnackbarOpen(false); // closes pop-up message

  // Filter Panel Component inside Drawer
  const FilterPanel = () => (
    <Box sx={{ width: 300, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer(false)} aria-label="Close filters">
            <Close />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box component="form" noValidate autoComplete="off">
        <TextField // textfield to allow the user to enter a location
          fullWidth
          variant="outlined"
          label="Location"
          value={filters.location}
          onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
          sx={{ mb: 2 }} // updates as the user enters input
        />
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="job-type-label">Job Type</InputLabel>
          <Select // drop down menu showing all possible job types
            labelId="job-type-label"
            label="Job Type"
            value={filters.type}
            onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Entry Level">Entry Level</MenuItem>
          </Select>
        </FormControl>
        <Typography gutterBottom>Minimum Salary ($)</Typography>
        <Slider // adds slider element whih is used to determine the desired salary
          value={typeof filters.salary === 'number' ? filters.salary : 0}
          onChange={(e, newValue) => setFilters((prev) => ({ ...prev, salary: newValue }))} // updates available jobs as the user changes salary requirements
          aria-labelledby="salary-slider"
          valueLabelDisplay="auto"
          step={5000}
          marks
          min={0}
          max={200000}
          sx={{ mb: 2 }}
        />
        <Autocomplete // user can select from a multitude of skills
          multiple
          options={allSkills}
          value={filters.skills}
          onChange={(e, newValue) => setFilters((prev) => ({ ...prev, skills: newValue }))} // available jobs change as the user selects/removes skills
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Skills" placeholder="Select skills" />
          )}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}> // reset filters button and apply filters button
          <Button fullWidth variant="outlined" onClick={clearFilters} aria-label="Reset filters">
            Reset
          </Button>
          <Button fullWidth variant="contained" onClick={toggleDrawer(false)} aria-label="Apply filters">
            Apply
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return ( // header components
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <HeaderBox>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 1, textAlign: 'center' }}>
            Find Your Next Opportunity
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.95, mb: 2, textAlign: 'center' }}>
            Discover {jobs.length} tech jobs from leading companies
          </Typography>
          <Box sx={{ display: 'flex', width: '100%', maxWidth: 600, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Job title, company, or keywords"
              InputProps={{
                startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
                sx: { borderRadius: 2, bgcolor: 'background.paper' },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search jobs"
            />
            <IconButton onClick={toggleDrawer(true)} aria-label="Open filters" sx={{ ml: 1 }}>
              <FilterList />
            </IconButton>
          </Box>
        </Container>
      </HeaderBox>

      <Container sx={{ py: 4 }}>
        {loading ? ( // checks if portal is in a loading state
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? ( // checks for error, if error is present, error message will show with a retry button
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
            <Button variant="outlined" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}> // organises job cards in a grid format
            {jobs.map((job) => ( // ensures each element in the job array has a card
              <Grid item xs={12} sm={6} lg={4} key={job.id}>
                <JobCard
                  job={job}
                  isSaved={savedJobs.has(job.id)}
                  onToggleSave={toggleSaveJob}
                  onOpenJobDetails={openJobDetails}
                  onSkillClick={addSkillFilter}
                />
              </Grid>
            ))}
          </Grid>
        )}
// displays message if: loading has finished, there is no error and no jobs match filter criteria
        {!loading && !error && jobs.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No jobs found matching your criteria
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={clearFilters}>
              Clear Filters
            </Button>
          </Box>
        )}
      </Container>

      {/* Filter Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
      >
        <FilterPanel />
      </Drawer>
// components of the dialog that is opened when a user clicks on a specific job
      {/* Job Details Dialog */}
      <Dialog open={Boolean(selectedJob)} onClose={closeJobDetails} fullWidth maxWidth="sm">
        {selectedJob && (
          <>
            <DialogTitle>{selectedJob.title}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle1" gutterBottom>
                {selectedJob.company} - {selectedJob.location}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedJob.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {(selectedJob.skills || '') 
                  .toString()               
                  .split(',')               
                  .map((skill, index) => (
                    <Chip 
                      key={index} 
                      label={skill.trim()} 
                      size="small" 
                      variant="outlined" 
                    />
                  ))}
              </Box>
            </DialogContent>
            <DialogActions>
        <Button onClick={closeJobDetails} color="primary"> // buttons to close and apply
          Close
        </Button>
        <Button 
          variant="contained" 
          onClick={() => handleApplyClick(selectedJob.id)}
        >
          Apply Now





