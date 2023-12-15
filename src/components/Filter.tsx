import { useState } from 'react';
import { setNotification } from '../redux/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAndPushGenres } from '../services/genresService';
import { getBooks } from '../services/booksService';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';

const Filter = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.genres.genres);
  const genrePage = useAppSelector((state) => state.genres.pagination.page);
  const [filter, setFilter] = useState({
    title: '',
    borrowed: false,
    available: false,
  });

  const handleLoadMoreGenres = async () => {
    await dispatch(getAndPushGenres({ page: genrePage + 1, limit: 3 }));
  };

  const handleFilter = async () => {
    await dispatch(
      getBooks({
        title: filter.title,
        borrowed: filter.borrowed,
        available: filter.available,
        pagination: { limit: 8 },
      })
    );
    setFilter({ title: '', borrowed: false, available: false });
    dispatch(setNotification({ message: 'Filter books successfully', type: 'success' }));
  };

  return (
    <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: '35px' }}>
      <Typography sx={{ fontSize: '30px' }}>Filter</Typography>
      <TextField
        fullWidth
        label='Book title'
        size='small'
        variant='outlined'
        onChange={(event) => setFilter({ ...filter, title: event.target.value })}
      />

      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>Genres</Typography>
        {genres.map((genre) => (
          <Box key={genre._id} sx={{ fontSize: '15px' }}>
            <Checkbox /> {genre.title}
          </Box>
        ))}
        <Button sx={{ fontSize: '12px' }} size='small' variant='contained' onClick={handleLoadMoreGenres}>
          Load more
        </Button>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>Book Status</Typography>
        <Box sx={{ fontSize: '15px' }}>
          <Checkbox
            onClick={() => setFilter({ ...filter, borrowed: !filter.borrowed })}
            disabled={filter.available ? true : false}
          />
          Borrowed
        </Box>
        <Box sx={{ fontSize: '15px' }}>
          <Checkbox
            onClick={() => setFilter({ ...filter, available: !filter.available })}
            disabled={filter.borrowed ? true : false}
          />
          Available
        </Box>
      </Box>
      <Button variant='contained' onClick={handleFilter}>
        Filter
      </Button>
    </Box>
  );
};

export default Filter;
