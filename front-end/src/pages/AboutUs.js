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

  const stats = [
    { label: 'Jobs Posted', value: '250,000+', icon: <WorkOutline /> },
    { label: 'Companies', value: '10,000+', icon: <Business /> },
    { label: 'Job Seekers', value: '1.5M+', icon: <People /> },
    { label: 'Success Rate', value: '92%', icon: <EmojiEvents /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/dashboard"
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography color="text.primary">About Us</Typography>
      </Breadcrumbs>

      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 2 }}
      >
        About Job Portal
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 6, fontWeight: 'normal' }}
      >
        Connecting talent with opportunity since 2015
      </Typography>

      {/* Hero Section */}
      <Card
        elevation={0}
        sx={{
          mb: 8,
          overflow: 'hidden',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image="https://source.unsplash.com/random/1200x400/?office,team"
          alt="Job Portal Team"
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At Job Portal, we believe that the right job can change a person's
            life, and the right person can transform a company. Our mission is to
            create meaningful connections between talented individuals and
            forward-thinking organizations, fostering growth and innovation in
            the global workforce.
          </Typography>
          <Typography variant="body1">
            We're dedicated to building a platform that makes the job search and
            hiring process more efficient, transparent, and human-centered. By
            leveraging technology and data insights, we help people find not just
            any job, but the right job—one that aligns with their skills,
            values, and aspirations.
          </Typography>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Our Impact
      </Typography>

      <Grid container spacing={3} sx={{ mb: 8 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                },
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: '50%',
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  display: 'flex',
                }}
              >
                {stat.icon}
              </Box>
              <Typography
                variant="h4"
                component="p"
                fontWeight="bold"
                gutterBottom
              >
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Our Story Section */}
      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" paragraph>
            Job Portal was founded in 2015 by a team of HR professionals and
            technology experts who saw an opportunity to revolutionize the way
            people find jobs and companies hire talent.
          </Typography>
          <Typography variant="body1" paragraph>
            What started as a small startup with a handful of job listings has
            grown into one of the most trusted employment platforms, serving
            millions of job seekers and thousands of employers worldwide.
          </Typography>
          <Typography variant="body1">
            Throughout our journey, we've remained committed to our core values:
            transparency, inclusivity, innovation, and excellence. These
            principles guide everything we do, from the features we develop to
            the way we interact with our users.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 4,
              }}
            >
              <Timeline
                color="primary"
                sx={{ fontSize: 40, mr: 2, mt: 0.5 }}
              />
              <Box>
                <Typography variant="h6" gutterBottom>
                  2015
                </Typography>
                <Typography variant="body2">
                  Founded in San Francisco with a mission to transform the job
                  search experience
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 4,
              }}
            >
              <Timeline
                color="primary"
                sx={{ fontSize: 40, mr: 2, mt: 0.5 }}
              />
              <Box>
                <Typography variant="h6" gutterBottom>
                  2018
                </Typography>
                <Typography variant="body2">
                  Expanded internationally, opening offices in Europe and Asia
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Timeline
                color="primary"
                sx={{ fontSize: 40, mr: 2, mt: 0.5 }}
              />
              <Box>
                <Typography variant="h6" gutterBottom>
                  2021
                </Typography>
                <Typography variant="body2">
                  Launched advanced AI matching technology to better connect
                  candidates with their ideal positions
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Team Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Our Leadership Team
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                },
              }}
            >
              <Avatar
                src={member.image}
                alt={member.name}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h6" component="h3" gutterBottom>
                {member.name}
              </Typography>
              <Chip
                label={member.role}
                color="primary"
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                {member.bio}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Values Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Our Values
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Innovation
            </Typography>
            <Typography variant="body2">
              We continuously seek new ways to improve our platform and services,
              embracing emerging technologies and creative solutions to complex
              problems.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Inclusivity
            </Typography>
            <Typography variant="body2">
              We believe in creating equal opportunities for all, regardless of
              background, identity, or circumstance. Our platform is designed to
              be accessible and welcoming to everyone.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Transparency
            </Typography>
            <Typography variant="body2">
              We believe in honest communication and clear expectations. We
              strive to provide accurate information and insights to help both
              job seekers and employers make informed decisions.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Excellence
            </Typography>
            <Typography variant="body2">
              We are committed to delivering the highest quality service and user
              experience. We set high standards for ourselves and continuously
              work to exceed expectations.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Join Us in Shaping the Future of Work
        </Typography>
        <Typography variant="body1">
          Whether you're looking for your next career move or seeking top talent
          for your organization, we're here to help you succeed.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
