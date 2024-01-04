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
    <Box
      sx={{
        marginY: '50px',
        backgroundColor: `${theme ? '#edfff2' : '#105e25'}`,
        borderRadius: '25px',
        padding: '30px',
      }}
    >
      <Typography sx={{ fontSize: '25px' }}>Filter</Typography>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Title'
            onChange={(event) => dispatch(updateFilter({ ...filter, title: event.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AutoCompleteGenres />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AutoCompleteAuthors />
        </Grid>
        <Grid item xs={12} sm={12}>
          <ToggleButtonGroup fullWidth value={filter.status} exclusive color='error' onChange={handleAlignment}>
            <ToggleButton value=''>All</ToggleButton>
            <ToggleButton value='available'>Available</ToggleButton>
            <ToggleButton value='borrowed'>Borrowed</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Button variant='contained' color='primary' onClick={handleFilter} sx={{ width: '20%' }}>
        Filter
      </Button>
    </Box>
  );
};

export default Filter;
