import { Box, Typography } from '@mui/material';

const BooksTrending = () => {
  return (
    <Box sx={{ my: '50px' }}>
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Typography sx={{ color: 'primary.main', fontSize: '30px', fontWeight: 'bold' }}>Trending</Typography>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>books</Typography>
      </Box>
    </Box>
  );
};

export default BooksTrending;
