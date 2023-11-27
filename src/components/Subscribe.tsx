import { Box, TextField, Button, Typography } from '@mui/material';

const Subscribe = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '300px',
        backgroundColor: '#58db7b',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '80%',
          marginX: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: '35px', maxWidth: '500px' }}>
          Subcribe our newsletter for newest books updates
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'centers', gap: '10px' }}>
          <TextField id='outlined-basic' label='Type your email here' sx={{ color: 'white' }} />
          <Button variant='contained' sx={{ fontSize: '20px', color: 'white' }}>
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Subscribe;
