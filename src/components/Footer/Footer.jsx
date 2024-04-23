import * as React from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Typography, Container, IconButton, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(135deg, black, cyan)',
        color: theme.palette.common.white,
        pt: 1, 
        pb: 1,
        px: 3   
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Connect with Us!
        </Typography>
        <BottomNavigation
          showLabels
          sx={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            '& .MuiBottomNavigationAction-root': {
              maxWidth: 'none',
              '&:hover': {
                transform: 'scale(1.1)',  
              },
              transition: theme.transitions.create(['transform'], {
                duration: theme.transitions.duration.short,
              }),
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',  
            },
            '& .MuiSvgIcon-root': {  
            }
          }}
        >
          <BottomNavigationAction
            component="a"
            href="https://www.facebook.com/TranPhamMinhDang"
            label="Facebook"
            icon={<FacebookIcon />}
            sx={{ color: theme.palette.common.white }}
          />
          <BottomNavigationAction
            label="Email"
            icon={
              <IconButton color="inherit" aria-label="email" sx={{ '&:hover': { color: theme.palette.info.main } }}>
                <EmailIcon />
              </IconButton>
            }
          />
          <BottomNavigationAction
            label="Contact"
            icon={
              <IconButton color="inherit" aria-label="phone" sx={{ '&:hover': { color: theme.palette.warning.main } }}>
                <PhoneForwardedIcon />
              </IconButton>
            }
          />
        </BottomNavigation>
        <Typography variant="caption" display="block" align="center" mt={1}>
          © 2024 HomeMate Website, Inc. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
