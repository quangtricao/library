import { Box, Typography, Link, TextField, Button } from '@mui/material/';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TikTokIcon from './TiktokIcon';

const Footer = () => {
  return (
    <Box component='footer' sx={{ py: 3, maxWidth: '80%', marginX: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '150px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography>App Icon</Typography>
            <Typography>App Name</Typography>
          </Box>

          <Typography>
            ... is an online bookstore website who sells all genres of books from around the world.
            Find your book here now
          </Typography>
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

        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '100px' }}>
          <Typography>Quick Links</Typography>
          <Typography>About Us</Typography>
          <Typography>Contact Us</Typography>
          <Typography>Books</Typography>
          <Typography>Login</Typography>
          <Typography>Sign Up</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '100px' }}>
          <Typography>Customer Area</Typography>
          <Typography>My Account</Typography>
          <Typography>Contact Us</Typography>
          <Typography>Books</Typography>
          <Typography>Login</Typography>
          <Typography>Sign Up</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>Don't miss the newest books</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, quis? Nihil sit,
            exercitationem ullam minima animi voluptatibus voluptatum sunt, illo voluptas ipsam
            sequi praesentium aperiam facilis.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'centers', gap: '10px' }}>
            <TextField id='outlined-basic' label='Type your email here' sx={{ color: 'white' }} />
            <Button variant='contained' sx={{ color: 'white' }}>
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Typography variant='body1'>My sticky footer can be found here.</Typography>
        <Typography variant='body2'>
          {'© '}
          {new Date().getFullYear()}
          {' All Rights Reserved'}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
