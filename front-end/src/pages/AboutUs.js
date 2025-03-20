import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from '@mui/material';
import {
  Home,
  Business,
  People,
  Timeline,
  WorkOutline,
  EmojiEvents,
} from '@mui/icons-material';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://source.unsplash.com/random/300x300/?woman,professional,1',
      bio: 'Former HR executive with 15+ years of experience in talent acquisition and workforce development.',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://source.unsplash.com/random/300x300/?man,professional,1',
      bio: 'Tech innovator with a passion for creating platforms that connect people with opportunities.',
    },
    {
      name: 'Priya Patel',
      role: 'Head of Operations',
      image: 'https://source.unsplash.com/random/300x300/?woman,professional,2',
      bio: 'Operations expert focused on creating seamless experiences for job seekers and employers alike.',
    },
    {
      name: 'David Wilson',
      role: 'Marketing Director',
      image: 'https://source.unsplash.com/random/300x300/?man,professional,2',
      bio: 'Digital marketing strategist helping companies and candidates find their perfect match.',
    },
  ];
