
  
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

const defaultFilters = {
  type: '',
  location: '',
  salary: 0,
  skills: [],
};
const allSkills = ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript', 'Node.js'];

const parseSalary = (salaryStr) => {
  const match = salaryStr.match(/\$?(\d+)[kK]/);
  return match ? parseInt(match[1]) * 1000 : 0;
};

// Styled components
const StyledCard = motion(styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
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

const HeaderBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  padding: theme.spacing(4, 2, 8),
  color: theme.palette.common.white,
  position: 'relative',
  overflow: 'hidden',
}));

const SearchBox = styled(motion.div)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(2),
  position: 'relative',
  zIndex: 1,
}));

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

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

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

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setApplyDialogOpen(true);
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
        setApplyDialogOpen(false);
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
        <TextField
          fullWidth
          variant="outlined"
          label="Location"
          value={filters.location}
          onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="job-type-label">Job Type</InputLabel>
          <Select
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
        <Slider
          value={typeof filters.salary === 'number' ? filters.salary : 0}
          onChange={(e, newValue) => setFilters((prev) => ({ ...prev, salary: newValue }))}
          aria-labelledby="salary-slider"
          valueLabelDisplay="auto"
          step={5000}
          marks
          min={0}
          max={200000}
          sx={{ mb: 2 }}
        />
        <Autocomplete
          multiple
          options={allSkills}
          value={filters.skills}
          onChange={(e, newValue) => setFilters((prev) => ({ ...prev, skills: newValue }))}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Skills" placeholder="Select skills" />
          )}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
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

  return (
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
            {jobs.map((job) => (
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
        <Button onClick={closeJobDetails} color="primary">
          Close
        </Button>
        <Button 
          variant="contained" 
          onClick={() => handleApplyClick(selectedJob.id)}
        >
          Apply Now
        </Button>
      </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={applyDialogOpen} onClose={() => setApplyDialogOpen(false)} fullWidth maxWidth="sm">
  <DialogTitle>Apply for Job</DialogTitle>
  <DialogContent dividers>
    <TextField
      fullWidth
      label="Full Name"
      value={applicationData.name}
      onChange={(e) => setApplicationData(prev => ({...prev, name: e.target.value}))}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      label="Email"
      type="email"
      value={applicationData.email}
      onChange={(e) => setApplicationData(prev => ({...prev, email: e.target.value}))}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      label="Cover Letter"
      multiline
      rows={4}
      value={applicationData.coverLetter}
      onChange={(e) => setApplicationData(prev => ({...prev, coverLetter: e.target.value}))}
      sx={{ mb: 2 }}
    />
    <input
      accept=".pdf,.doc,.docx"
      style={{ display: 'none' }}
      id="cv-upload"
      type="file"
      onChange={(e) => setApplicationData(prev => ({...prev, cv: e.target.files[0]}))}
    />
    
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setApplyDialogOpen(false)}>
      Cancel
    </Button>
    <Button 
      variant="contained" 
      onClick={handleApplicationSubmit}
      disabled={!applicationData.email}
    >
      Submit Application
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







