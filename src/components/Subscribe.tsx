import { Box, TextField, Button, Typography } from '@mui/material';
import { AppContext } from '../App';
import { useContext } from 'react';

const Subscribe = () => {
  const { theme } = useContext(AppContext);

  return (
    <Box
      sx={{
        width: '100%',
        height: '200px',
        backgroundColor: `${theme ? 'primary.main' : '#174223'}`,
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
        <Typography sx={{ fontSize: '30px', maxWidth: '500px' }}>Subcribe our newsletter</Typography>
        <Box sx={{ display: 'flex', alignItems: 'centers', gap: '10px' }}>
          <TextField id='outlined-basic' label='Type your email here' sx={{ width: '400px' }} />
          <Button variant='contained' sx={{ fontSize: '18px' }}>
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Subscribe;
