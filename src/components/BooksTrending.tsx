import { Box, Typography } from '@mui/material';

const BooksTrending = () => {
  return (
    <Box>
      <Box sx={{ maxWidth: '80%', marginX: 'auto', marginTop: '50px' }}>
        <Typography>Trending this week</Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, deserunt. Iure deleniti
          eligendi perferendis, quos voluptatem corrupti, eius itaque veritatis, unde quo aperiam
          blanditiis. Qui possimus earum iste alias labore?
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridGap: '20px',
          height: '500px',
          maxWidth: '80%',
          marginX: 'auto',
          marginTop: '50px',
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
