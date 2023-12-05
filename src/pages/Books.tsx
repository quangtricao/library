import { Box, Checkbox, Grid, Typography, Pagination, Stack, Button } from '@mui/material';

import Subscribe from '../components/Subscribe';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';
import { fetchBooks } from '../redux/slices/booksSlice';

const Books = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const { totalPages } = useAppSelector((state) => state.books.pagination);
  const status = useAppSelector((state) => state.books.status);
  const [localPage, setLocalPage] = useState<number>(1);

  const handleLocalPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchBooks({ page: value, limit: 6 }));
    setLocalPage(value);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {books.map((book) => (
              <Grid key={book._id} item xs={1}>
                <img src={`https://picsum.photos/250/${250 * 1.5}`} alt={`Book ${book.title}`} />
                <Box>
                  {book.status === 'available' ? (
                    <Button variant='contained'>Borrow</Button>
                  ) : (
                    <Button variant='contained'>Not in Library</Button>
                  )}
                  <Box>{book.title}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2}>
            <Pagination count={totalPages} page={localPage} onChange={handleLocalPageChange} />
          </Stack>
        </Box>
      </Box>

      <Subscribe />
    </Box>
  );
};

export default Books;
