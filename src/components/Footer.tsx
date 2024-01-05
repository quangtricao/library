import { Box, Typography, Link, Container } from '@mui/material/';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        marginTop: '50px',
        marginBottom: '15px',
        fontWeight: 'bold',
        borderTop: '2px',
        borderRight: '0px',
        borderLeft: '0px',
        borderBottom: '0px',
        borderStyle: 'solid',
        borderColor: 'primary.main',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Typography>Follow Us:</Typography>
          <Link href='https://youtu.be/xvFZjo5PgG0?si=q0_qJg2_kvWbzBV3' target='_blank' rel='noreferrer'>
            <FacebookIcon />
          </Link>
          <Link href='https://youtu.be/xvFZjo5PgG0?si=q0_qJg2_kvWbzBV3' target='_blank' rel='noreferrer'>
            <InstagramIcon />
          </Link>
          <Link href='https://youtu.be/xvFZjo5PgG0?si=q0_qJg2_kvWbzBV3' target='_blank' rel='noreferrer'>
            <YouTubeIcon />
          </Link>
        </Box>
        <Typography>
          Project is inspired by{' '}
          <a href='https://openlibrary.org/' target='_blank' rel='noreferrer'>
            OpenLibrary
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
