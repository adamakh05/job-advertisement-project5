import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Autocomplete,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import { Close } from '@mui/icons-material';

const FilterPanel = ({ 
  filters, 
  setFilters, 
  clearFilters, 
  toggleDrawer, 
  isMobile, 
  allSkills 
}) => (
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

export default FilterPanel;
