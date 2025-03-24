import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore,
  Gavel,
  Assignment,
  Security,
  Block,
  Copyright,
  Home,
} from '@mui/icons-material';

const TermsOfService = () => {
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
        <Typography color="text.primary">Terms of Service</Typography>
      </Breadcrumbs>

      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Terms of Service
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
          Please read these Terms of Service carefully before using the Job
          Portal website and services. Your access to and use of the service is
          conditioned on your acceptance of and compliance with these terms.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Accordion
          elevation={0}
          sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="agreement-content"
            id="agreement-header"
            sx={{ bgcolor: 'background.default' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Assignment color="primary" sx={{ mr: 2 }} />
              <Typography variant="h6" fontWeight="medium">
                User Agreement
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              By accessing or using our service, you agree to be bound by these
              Terms. If you disagree with any part of the terms, you may not
              access the service.
            </Typography>
            <Typography paragraph>
              We reserve the right to terminate or suspend access to our service
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          elevation={0}
          sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="account-content"
            id="account-header"
            sx={{ bgcolor: 'background.default' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Security color="primary" sx={{ mr: 2 }} />
              <Typography variant="h6" fontWeight="medium">
                Account Security
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to do
              so constitutes a breach of the Terms, which may result in immediate
              termination of your account on our service.
            </Typography>
            <Typography paragraph>
              You are responsible for safeguarding the password that you use to
              access the service and for any activities or actions under your
              password. You agree not to disclose your password to any third
              party.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          elevation={0}
          sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="prohibited-content"
            id="prohibited-header"
            sx={{ bgcolor: 'background.default' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Block color="primary" sx={{ mr: 2 }} />
              <Typography variant="h6" fontWeight="medium">
                Prohibited Activities
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              You may not access or use the service for any purpose other than
              that for which we make the service available. As a user of the
              service, you agree not to:
            </Typography>
            <ul>
              <li>
                <Typography paragraph>
                  Use the service in any manner that could disable, overburden,
                  damage, or impair the site.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Use any robot, spider, or other automatic device to access the
                  service for any purpose without our express written permission.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Introduce any viruses, trojan horses, worms, or other material
                  which is malicious or technologically harmful.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Attempt to gain unauthorized access to, interfere with, damage,
                  or disrupt any parts of the service.
                </Typography>
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>

        <Accordion
          elevation={0}
          sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="intellectual-content"
            id="intellectual-header"
            sx={{ bgcolor: 'background.default' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Copyright color="primary" sx={{ mr: 2 }} />
              <Typography variant="h6" fontWeight="medium">
                Intellectual Property
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              The service and its original content, features, and functionality
              are and will remain the exclusive property of Job Portal and its
              licensors. The service is protected by copyright, trademark, and
              other laws.
            </Typography>
            <Typography paragraph>
              Our trademarks and trade dress may not be used in connection with
              any product or service without the prior written consent of Job
              Portal.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          elevation={0}
          sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="governing-content"
            id="governing-header"
            sx={{ bgcolor: 'background.default' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Gavel color="primary" sx={{ mr: 2 }} />
              <Typography variant="h6" fontWeight="medium">
                Governing Law
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              These Terms shall be governed and construed in accordance with the
              laws, without regard to its conflict of law provisions.
            </Typography>
            <Typography paragraph>
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights. If any provision of
              these Terms is held to be invalid or unenforceable by a court, the
              remaining provisions of these Terms will remain in effect.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1">
            If you have any questions about these Terms, please contact us at:
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Email: legal@jobportal.com
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

export default TermsOfService;
