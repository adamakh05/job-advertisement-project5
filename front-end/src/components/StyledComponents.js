import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';
import { motion } from 'framer-motion';

export const StyledCard = motion(styled(Card)(({ theme }) => ({
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

export const HeaderBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  padding: theme.spacing(4, 2, 8),
  color: theme.palette.common.white,
  position: 'relative',
  overflow: 'hidden',
}));

export const SearchBox = styled(motion.div)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(2),
  position: 'relative',
  zIndex: 1,
}));
