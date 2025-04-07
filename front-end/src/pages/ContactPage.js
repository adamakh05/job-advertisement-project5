import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Home,
  Email,
  Phone,
  LocationOn,
  Send,
  QuestionAnswer,
  Business,
  Person,
} from '@mui/icons-material';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    userType: 'job-seeker',
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would normally send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Your message has been sent successfully!',
        severity: 'success',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        userType: 'job-seeker',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const contactInfo = [
    {
      icon: <Email color="primary" fontSize="large" />,
      title: 'Email Us',
      details: ['contact@jobportal.com', 'support@jobportal.com'],
    },
    {
      icon: <Phone color="primary" fontSize="large" />,
      title: 'Call Us',
      details: ['+1 (123) 456-7890', '+1 (987) 654-3210'],
    },
    {
      icon: <LocationOn color="primary" fontSize="large" />,
      title: 'Visit Us',
      details: ['123 Job Street', 'Employment City, EC 12345'],
    },
  ];

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
        <Typography color="text.primary">Contact Us</Typography>
      </Breadcrumbs>

      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 2 }}
      >
        Contact Us
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 6, fontWeight: 'normal' }}
      >
        We'd love to hear from you. Get in touch with our team.
      </Typography>

      <Grid container spacing={6}>
        {/* Contact Information */}
        <Grid item xs={12} md={5}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Get In Touch
            </Typography>
            <Typography variant="body1" paragraph>
              Have questions about our platform, need help with your account, or
              want to explore partnership opportunities? Our team is here to
              help.
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    display: 'flex',
                    p: 2,
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 1.5,
                      mr: 2,
                    }}
                  >
                    {info.icon}
                  </Box>
                  <CardContent sx={{ flex: 1, p: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {info.title}
                    </Typography>
                    {info.details.map((detail, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        color="text.secondary"
                      >
                        {detail}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Office Hours
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM EST
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Saturday:</strong> 10:00 AM - 2:00 PM EST
            </Typography>
            <Typography variant="body2">
              <strong>Sunday:</strong> Closed
            </Typography>
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <QuestionAnswer color="primary" sx={{ mr: 1.5 }} />
              <Typography variant="h5" component="h2">
                Send Us a Message
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="user-type-label">I am a</InputLabel>
                    <Select
                      labelId="user-type-label"
                      id="userType"
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      label="I am a"
                      startAdornment={
                        formData.userType === 'job-seeker' ? (
                          <Person color="action" sx={{ mr: 1 }} />
                        ) : (
                          <Business color="action" sx={{ mr: 1 }} />
                        )
                      }
                    >
                      <MenuItem value="job-seeker">Job Seeker</MenuItem>
                      <MenuItem value="employer">Employer</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number (Optional)"
                    name="phone"
                    variant="outlined"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    variant="outlined"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    variant="outlined"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    multiline
                    rows={5}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Send />}
                    sx={{ mt: 1 }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 8 }} />

      {/* Map Section */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Our Location
      </Typography>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          height: 400,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941774136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1619826381244!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Office Location"
        ></iframe>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage;
