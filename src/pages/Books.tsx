import { Box, Checkbox, Grid, Typography } from '@mui/material';

import Service from '../components/Service';
import Subscribe from '../components/Subscribe';

const Books = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
          <Typography>Filter</Typography>
          <Typography>Genres</Typography>
          <Box>
            <Checkbox /> 1
          </Box>
          <Box>
            <Checkbox /> 2
          </Box>
          <Box>
            <Checkbox /> 3
          </Box>
          <Box>
            <Checkbox /> 4
          </Box>
          <Box>
            <Checkbox /> 5
          </Box>
          <Box>
            <Checkbox /> 6
          </Box>
          <Typography>Load more</Typography>
          <Typography>Status</Typography>
          <Box>
            <Checkbox /> Borrowed
          </Box>
          <Box>
            <Checkbox /> Available
          </Box>
        </Box>

        <Box sx={{ width: '80%' }}>
          <Typography>Books</Typography>
          <Grid container spacing={4} columns={3} sx={{ marginTop: '30px' }}>
            <Grid item xs={1} sx={{ height: '500px', width: '200px' }}>
              <Box sx={{ backgroundColor: '#edfff2', height: '100%' }}>123</Box>
            </Grid>
            <Grid item xs={1} sx={{ height: '500px', width: '200px' }}>
              <Box sx={{ backgroundColor: '#edfff2', height: '100%' }}>123</Box>
            </Grid>
            <Grid item xs={1} sx={{ height: '500px', width: '200px' }}>
              <Box sx={{ backgroundColor: '#edfff2', height: '100%' }}>123</Box>
            </Grid>
            <Grid item xs={1} sx={{ height: '500px', width: '200px' }}>
              <Box sx={{ backgroundColor: '#edfff2', height: '100%' }}>123</Box>
            </Grid>
            <Grid item xs={1} sx={{ height: '500px', width: '200px' }}>
              <Box sx={{ backgroundColor: '#edfff2', height: '100%' }}>123</Box>
            </Grid>
            <Grid item xs={1} sx={{ height: '500px', width: '200px' }}>
              <Box sx={{ backgroundColor: '#edfff2', height: '100%' }}>123</Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Service />
      <Subscribe />
    </Box>
  );
};

export default Books;
