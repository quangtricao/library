import { Box, Typography, Container, Link } from '@mui/material/';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth='sm'>
        <Typography variant='body1'>My sticky footer can be found here.</Typography>
        <Typography variant='body2'>
          {'Copyright © '}
          <Link color='inherit' href='https://mui.com/'>
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
