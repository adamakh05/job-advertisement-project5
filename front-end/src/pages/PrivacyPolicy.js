import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Security,
  DataUsage,
  Storage,
  Visibility,
  DeleteForever,
  Update,
  Home,
} from '@mui/icons-material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography color="text.primary">Privacy Policy</Typography>
      </Breadcrumbs>

      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Privacy Policy
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="body1" paragraph>
          Last updated: {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </Typography>

        <Typography variant="body1" paragraph>
          At Job Portal, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website or use our services.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            Information We Collect
          </Typography>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <DataUsage color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Personal Information"
                secondary="We may collect personal information that you voluntarily provide to us when you register on our platform, express interest in obtaining information about us or our products and services, participate in activities on the platform, or otherwise contact us."
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <Storage color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Usage Data"
                secondary="We automatically collect certain information when you visit, use, or navigate our platform. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our platform."
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            How We Use Your Information
          </Typography>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <Visibility color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Provide and maintain our services"
                secondary="We use your information to deliver our platform's functionality, maintain your account, respond to your inquiries, and manage your requests."
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <Security color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Protect our services"
                secondary="We use your information as part of our efforts to keep our platform safe and secure, including fraud monitoring and prevention."
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            Your Privacy Rights
          </Typography>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <DeleteForever color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Right to delete"
                secondary="You have the right to request the deletion of your personal information that we have collected about you, subject to certain exceptions."
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <Update color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Right to update"
                secondary="You can review and change your personal information by logging into the platform and visiting your account profile page."
              />
            </ListItem>
          </List>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have questions or comments about this Privacy Policy, please
            contact us at:
          </Typography>
          <Typography variant="body1">
            Email: privacy@jobportal.com
            <br />
            Address: 123 Job Street, Employment City, EC 12345
            <br />
            Phone: +1 (123) 456-7890
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
