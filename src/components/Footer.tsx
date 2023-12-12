import { Box, Typography, TextField, Button, Link } from '@mui/material/';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Box component='footer' sx={{ py: 3, maxWidth: '80%', marginX: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '350px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>FIN-16-Library</Typography>
          <Typography>An online bookstore that loans all genres of books all over the world.</Typography>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <Typography sx={{ paddingRight: '5px' }}>Follow Us</Typography>
            <Link href=''>
              <FacebookIcon />
            </Link>
            <Link href=''>
              <InstagramIcon />
            </Link>
            <Link href=''>
              <YouTubeIcon />
            </Link>
          </Box>

          <Typography variant='body2'>
            FIN-16-Library {'© '} {new Date().getFullYear()} All Rights Reserved
          </Typography>
        </Box>

        <Box sx={{ width: '150px' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>Quick Links</Typography>
          <Typography>About Us</Typography>
          <Typography>Contact Us</Typography>
          <Typography>Books</Typography>
        </Box>

        <Box sx={{ width: '150px' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>Customer Area</Typography>
          <Typography>My Account</Typography>
          <Typography>Login</Typography>
          <Typography>Sign Up</Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>Don't miss our newest books</Typography>
          <Box sx={{ display: 'flex', gap: '15px', marginY: '20px' }}>
            <TextField id='outlined-basic' label='Type your email here' sx={{ width: '300px' }} size='small' />
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
