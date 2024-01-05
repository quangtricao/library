import { useContext } from 'react';
import { Box, Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { AppContext } from '../App';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setNotification } from '../redux/slices/notificationSlice';
import { getBooks } from '../services/booksService';
import AutoCompleteGenres from './AutoCompleteGenres';
import AutoCompleteAuthors from './AutoCompleteAuthors';
import { updateFilter } from '../redux/slices/filterSlice';

const Filter = () => {
  const { theme } = useContext(AppContext);
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);

  const handleFilter = async () => {
    await dispatch(getBooks({ ...filter, pagination: { page: 1, limit: 8 } }));
    dispatch(setNotification({ message: 'Filter books successfully', type: 'success' }));
  };

  const handleAlignment = (_event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (!newAlignment) {
      dispatch(updateFilter({ ...filter, status: '' }));
      return;
    }
    dispatch(updateFilter({ ...filter, status: newAlignment }));
  };

  return (
    <Box sx={{ marginTop: '50px' }}>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>All </Typography>
        <Typography
          sx={{
            fontSize: '30px',
            color: 'primary.main',
            fontWeight: 'bold',
            borderTop: '0px',
            borderRight: '0px',
            borderLeft: '0px',
            borderBottom: '4px',
            borderStyle: 'solid',
            borderColor: 'primary.light',
          }}
        >
          Books
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: `${theme ? 'rgb(238, 238, 238)' : 'rgb(66, 66, 66)'}`,
          borderRadius: '15px',
          padding: '20px',
          marginTop: '10px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Title'
              onChange={(event) => dispatch(updateFilter({ ...filter, title: event.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <AutoCompleteGenres />
          </Grid>
          <Grid item xs={12} sm={3}>
            <AutoCompleteAuthors />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth sx={{ height: '100%' }} variant='contained' color='primary' onClick={handleFilter}>
              Filter
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <ToggleButtonGroup fullWidth value={filter.status} exclusive color='error' onChange={handleAlignment}>
              <ToggleButton value=''>All</ToggleButton>
              <ToggleButton value='available'>Available</ToggleButton>
              <ToggleButton value='borrowed'>Borrowed</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Filter;
