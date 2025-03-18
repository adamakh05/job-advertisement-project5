import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Container
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { HeaderBox } from './StyledComponents';
import ProfileMenu from './ProfileMenu';

const Header = ({ 
  searchTerm, 
  setSearchTerm, 
  toggleDrawer, 
  jobCount, 
  onPostJobClick 
}) => {
  return (
    <HeaderBox>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 1, textAlign: 'center' }}>
          Find Your Next Opportunity
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.95, mb: 2, textAlign: 'center' }}>
          Discover {jobCount} tech jobs from leading companies
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
          <ProfileMenu />
        </Box>
        <Box>
          <Button variant="contained" onClick={onPostJobClick}>
            Post a Job
          </Button>
        </Box>
      </Container>
    </HeaderBox>
  );
};

export default Header;

