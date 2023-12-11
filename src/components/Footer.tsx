import { Box, Typography, TextField, Button } from '@mui/material/';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TikTokIcon from './TiktokIcon';

const Footer = () => {
  return (
    <Box component='footer' sx={{ py: 3, maxWidth: '80%', marginX: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '150px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '300px' }}>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Typography>App Icon</Typography>
            <Typography>FIN-16-Library</Typography>
          </Box>

          <Typography>
            FIN-16-Library is an online bookstore that loans all genres of books all over the world.
          </Typography>
          <Box>
            <Typography>Follow Us</Typography>
            <Box sx={{ display: 'flex' }}>
              <FacebookIcon />
              <InstagramIcon />
              <Box sx={{ height: '25px' }}>
                <TikTokIcon />
              </Box>
              <YouTubeIcon />
            </Box>
          </Box>

          <Typography variant='body2'>
            {'© '}
            {new Date().getFullYear()}
            {' All Rights Reserved'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '100px' }}>
          <Typography>Quick Links</Typography>
          <Typography>About Us</Typography>
          <Typography>Contact Us</Typography>
          <Typography>Books</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '150px' }}>
          <Typography>Customer Area</Typography>
          <Typography>My Account</Typography>
          <Typography>Books</Typography>
          <Typography>Login</Typography>
          <Typography>Sign Up</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
          <Typography>Don't miss the newest books</Typography>
          <Box sx={{ display: 'flex', alignItems: 'centers', gap: '10px' }}>
            <TextField id='outlined-basic' label='Type your email here' sx={{ color: 'white' }} />
            <Button variant='contained' sx={{ color: 'white' }}>
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
