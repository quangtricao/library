import { Box } from '@mui/material';

const Books10TopRated = () => {
  return (
    <Box sx={{ width: '100%', marginTop: '50px', backgroundColor: '#edfff2' }}>
      <Box
        sx={{
          width: '100%',
          height: '300px',
          maxWidth: '80%',
          marginX: 'auto',
          marginTop: '50px',
        }}
      >
        10 Top Rated Books
      </Box>
    </Box>
  );
};

export default Books10TopRated;
