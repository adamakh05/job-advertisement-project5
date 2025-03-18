import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CardContent,
  IconButton,
  Avatar,
  Chip,
  Divider,
  Button,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Work,
  MonetizationOn,
  BookmarkBorder,
  Bookmark,
  ExpandMore
} from '@mui/icons-material';
import { StyledCard } from './StyledComponents';
import { jobService } from '../services/api';

const JobCard = ({
  job,
  isSaved,
  onToggleSave, // Optional callback from parent
  onOpenJobDetails,
  onSkillClick,
  refreshSavedJobs // Optional callback to refresh saved jobs in the parent
}) => {
  // Maintain local toggle state based on the passed prop.
  const [localSaved, setLocalSaved] = useState(isSaved);
  // State to track saving operation in progress
  const [savingJob, setSavingJob] = useState(false);

  // Update local state when prop changes.
  useEffect(() => {
    setLocalSaved(isSaved);
  }, [isSaved]);

  const handleToggleSave = async (jobId) => {
    try {
      setSavingJob(true);
      // Call the API to toggle saving for this job
      const response = await jobService.saveJob(jobId);

      if (response.status === 'success') {
        // Toggle the local saved status
        setLocalSaved((prev) => !prev);

        // Notify parent if callback is provided
        if (typeof onToggleSave === 'function') {
          onToggleSave(jobId, !localSaved);
        }

        // Optionally, refresh the entire saved jobs list in case parent maintains it
        if (typeof refreshSavedJobs === 'function') {
          await refreshSavedJobs();
        }
      }
    } catch (error) {
      console.error('Error toggling job save status:', error);
      // Optionally, show a snackbar/toast notification here
    } finally {
      setSavingJob(false);
    }
  };

  return (
    <StyledCard
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={() => handleToggleSave(job.id)}
          aria-label={localSaved ? 'Remove saved job' : 'Save job'}
          disabled={savingJob}
        >
          {savingJob ? (
            <CircularProgress size={20} />
          ) : localSaved ? (
            <Bookmark color="primary" />
          ) : (
            <BookmarkBorder sx={{ color: 'common.white' }} />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={job.logo}
            sx={{ width: 48, height: 48, mr: 2 }}
            alt={`${job.company} logo`}
          >
            {job.company?.charAt(0) || 'C'}
          </Avatar>
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
          {String(job.skills || '')
            .split(',')
            .filter(Boolean)
            .slice(0, 3)
            .map((skill, i) => (
              <Chip
                key={i}
                label={skill.trim()}
                size="small"
                variant="outlined"
                onClick={() =>
                  onSkillClick && onSkillClick(skill.trim())
                }
                clickable
                sx={{ cursor: 'pointer' }}
              />
            ))}

          {String(job.skills || '')
            .split(',')
            .filter(Boolean).length > 3 && (
            <Tooltip
              title={String(job.skills)
                .split(',')
                .slice(3)
                .join(', ')}
            >
              <Chip
                label={`+${
                  String(job.skills).split(',').filter(Boolean).length -
                  3
                }`}
                size="small"
              />
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
        >
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
          onClick={() =>
            onOpenJobDetails && onOpenJobDetails(job)
          }
          aria-label="View job details"
        >
          View Details
        </Button>
      </Box>
    </StyledCard>
  );
};

export default JobCard;
