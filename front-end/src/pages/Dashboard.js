import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Drawer,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Import components
import JobCard from '../components/JobCard';
import FilterPanel from '../components/FilterPanel';
import Header from '../components/Header';
import StickySearchBar from '../components/StickySearchBar';
import Footer from '../components/Footer';
import PostJobForm from '../components/PostJobForm';
import JobDetailsDialog from '../components/JobDetailsDialog';
import ApplyJobDialog from '../components/ApplyJobDialog';

const allSkills = ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript', 'Node.js'];
const defaultFilters = {
  type: '',
  location: '',
  salary: 0,
  skills: [],
};

const parseSalary = (salaryStr) => {
  const match = salaryStr.match(/\$?(\d+)[kK]/);
  return match ? parseInt(match[1]) * 1000 : 0;
};

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
  const [postJobDialogOpen, setPostJobDialogOpen] = useState(false);
  const [applyNowDialogOpen, setApplyNowDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    coverLetter: ''
  });
  const [showStickySearch, setShowStickySearch] = useState(false);

  // Effect to handle scroll and show/hide sticky search bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show sticky search bar after scrolling past the header (adjust threshold as needed)
      setShowStickySearch(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePostJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
    setPostJobDialogOpen(false);
  };

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const response = await fetch('/api/saved-jobs', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        
        if (data.status === 'success') {
          setSavedJobs(new Set(data.data.map(id => parseInt(id))));
        } else {
          console.error('Failed to fetch saved jobs:', data.message);
        }
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };
  
    fetchSavedJobs();
  }, []);
  
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

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setApplyNowDialogOpen(true); 
  };
  
  const handleApplicationSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setSnackbarOpen(true);
        return;
      }

      const response = await fetch(`http://localhost:5000/api/jobs/${selectedJobId}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: applicationData.name,
          email: applicationData.email,
          coverLetter: applicationData.coverLetter
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setSnackbarOpen(true);
        setApplyNowDialogOpen(false);
        setApplicationData({
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

  const toggleSaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setSnackbarOpen(true);
        return;
      }

      const response = await fetch(`/api/jobs/${jobId}/save`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.status === 'success') {
        setSavedJobs(prev => new Set(prev.has(jobId) ? 
          [...prev].filter(id => id !== jobId) : 
          [...prev, jobId]
        ));
        setSnackbarOpen(true);
      } else {
        console.error('Error toggling save:', data.message);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  // Memoized job filtering
  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        const searchMatch = `${job.title} ${job.company}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const typeMatch = !filters.type || job.type === filters.type;
        const locationMatch =
          !filters.location ||
          job.location.toLowerCase().includes(filters.location.toLowerCase());
        const salaryMatch = parseSalary(job.salary) >= filters.salary;
        const skillsMatch =
          !filters.skills.length ||
          filters.skills.every((skill) => job.skills.includes(skill));
        return searchMatch && typeMatch && locationMatch && salaryMatch && skillsMatch;
      }),
    [jobs, searchTerm, filters]
  );

  const toggleDrawer = (open) => () => setIsDrawerOpen(open);
  const openJobDetails = (job) => setSelectedJob(job);
  const closeJobDetails = () => setSelectedJob(null);
  const addSkillFilter = (skill) =>
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills : [...prev.skills, skill],
    }));
  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearchTerm('');
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Unified search handler for both search bars
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Main Header - Visible at the top */}
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={handleSearch} // Use the unified search handler
        toggleDrawer={toggleDrawer}
        jobCount={jobs.length}
        onPostJobClick={() => setPostJobDialogOpen(true)}
      />

      {/* Sticky Search Bar - Only appears when scrolling down */}
      {showStickySearch && (
        <StickySearchBar 
          onSearch={handleSearch} // Use the unified search handler
          onFilterClick={toggleDrawer(true)}
          placeholder="Search jobs, companies, or keywords..."
        />
      )}

      {/* Main Content */}
      <Container sx={{ py: 4, flexGrow: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
            <Button variant="outlined" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredJobs.map((job) => (
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

        {!loading && !error && filteredJobs.length === 0 && (
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

      {/* Footer */}
      <Footer />

      {/* Filter Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
      >
        <FilterPanel 
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
          toggleDrawer={toggleDrawer}
          isMobile={isMobile}
          allSkills={allSkills}
        />
      </Drawer>

      {/* Job Details Dialog */}
      <JobDetailsDialog 
        selectedJob={selectedJob}
        onClose={closeJobDetails}
        onApplyClick={handleApplyClick}
      />

      {/* Apply Dialog */}
      <ApplyJobDialog
        open={applyNowDialogOpen}
        onClose={() => setApplyNowDialogOpen(false)}
        applicationData={applicationData}
        setApplicationData={setApplicationData}
        onSubmit={handleApplicationSubmit}
      />

      {/* Post Job Dialog */}
      <Dialog open={postJobDialogOpen} onClose={() => setPostJobDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Post a Job</DialogTitle>
        <DialogContent dividers>
          <PostJobForm onPostJob={handlePostJob} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPostJobDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Job saved"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Dashboard;








