import { Box, Typography } from '@mui/material';

const TrendingBooks = () => {
  return (
    <Box sx={{ my: '50px' }}>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Typography
          sx={{
            color: 'primary.main',
            fontSize: '30px',
            fontWeight: 'bold',
            borderTop: '0px',
            borderRight: '0px',
            borderLeft: '0px',
            borderBottom: '4px',
            borderStyle: 'solid',
            borderColor: 'primary.light',
          }}
        >
          Trending
        </Typography>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>this week</Typography>
      </Box>
    </Box>
  );
};

export default TrendingBooks;
