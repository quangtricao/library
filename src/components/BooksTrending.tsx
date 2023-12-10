import { Box, Typography } from '@mui/material';

const BooksTrending = () => {
  return (
    <Box sx={{ maxWidth: '80%', marginX: 'auto', marginTop: '30px' }}>
      <Box>
        <Typography variant='h2' sx={{ fontSize: '20px' }}>
          Trending books
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridGap: '20px',
          height: '500px',
          marginTop: '20px',
        }}
      >
        <Box sx={{ height: '100%', backgroundColor: '#edfff2', gridArea: '1 / 1 / 3 /3' }}>1</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>2</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>3</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>4</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>5</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>6</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>7</Box>
      </Box>
    </Box>
  );
};

export default BooksTrending;
