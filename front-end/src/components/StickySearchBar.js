// src/components/StickySearchBar.jsx
import React from 'react';
import { Box, TextField, IconButton, Paper, AppBar, Toolbar, useScrollTrigger } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? 'white' : 'transparent',
      color: trigger ? 'inherit' : 'white',
      transition:
        'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
    },
  });
}

const StickySearchBar = ({ onSearch, onFilterClick, placeholder }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <ElevationScroll>
      <AppBar position="sticky" color="inherit">
        <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', maxWidth: 600 }}
            >
              <Paper
                component="form"
                onSubmit={handleSearchSubmit}
                elevation={trigger ? 1 : 0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  py: 0.5,
                  borderRadius: '50px',
                  border: trigger
                    ? 'none'
                    : '1px solid rgba(255,255,255,0.3)',
                  backgroundColor: trigger
                    ? 'white'
                    : 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: trigger
                      ? 'white'
                      : 'rgba(255,255,255,0.25)',
                  },
                }}
              >
                <IconButton type="submit" aria-label="search">
                  <Search sx={{ color: trigger ? 'action.active' : 'white' }} />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder={
                    placeholder ||
                    'Search jobs, companies, or keywords...'
                  }
                  value={searchTerm}
                  onChange={handleSearchChange}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    style: { color: trigger ? 'inherit' : 'white' },
                  }}
                  sx={{
                    mx: 1,
                    '& ::placeholder': {
                      color: trigger
                        ? 'text.secondary'
                        : 'rgba(255,255,255,0.7)',
                      opacity: 1,
                    },
                  }}
                />
                <IconButton aria-label="filters" onClick={onFilterClick}>
                  <FilterList sx={{ color: trigger ? 'action.active' : 'white' }} />
                </IconButton>
              </Paper>
            </motion.div>
          </AnimatePresence>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default StickySearchBar;
