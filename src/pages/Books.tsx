import { Box, Checkbox, Grid, Typography, Pagination, Stack, Button } from '@mui/material';

import Subscribe from '../components/Subscribe';
import { IDLE } from '../types/status';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useState, ChangeEvent, useEffect } from 'react';
import { getBooks } from '../services/booksService';
import { getGenres, getAndPushGenres } from '../services/genresService';

const Books = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const bookTotalPage = useAppSelector((state) => state.books.pagination.totalPages);
  const bookStatus = useAppSelector((state) => state.books.status);

  const genres = useAppSelector((state) => state.genres.genres);
  const genrePage = useAppSelector((state) => state.genres.pagination.page);
  const genreStatus = useAppSelector((state) => state.genres.status);

  const [localPage, setLocalPage] = useState<number>(1);

  useEffect(() => {
    if (bookStatus === IDLE) {
      dispatch(getBooks({}));
    }
    if (genreStatus === IDLE) {
      dispatch(getGenres({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocalPageChange = (_event: ChangeEvent<unknown>, value: number) => {
    dispatch(getBooks({ page: value, limit: 6 }));
    setLocalPage(value);
  };

  const handleLoadMoreGenres = () => {
    dispatch(getAndPushGenres({ page: genrePage + 1 }));
  };

  return (
    <Box sx={{ maxWidth: '80%', marginX: 'auto' }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
          <Typography>Filter</Typography>
          <Typography>Genres</Typography>
          {genres.map((genre) => (
            <Box key={genre._id}>
              <Checkbox /> {genre.title}
            </Box>
          ))}
          <Button sx={{ width: '75%' }} variant='contained' onClick={handleLoadMoreGenres}>
            Load more
          </Button>
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
                <img src={`https://picsum.photos/300/${300 * 1.5}`} alt={`Book ${book.title}`} />
                <Box>
                  {book.status === 'available' ? (
                    <Button variant='contained'>Borrow</Button>
                  ) : (
                    <Button variant='contained' disabled>
                      Not in Library
                    </Button>
                  )}
                  <Box>{book.title}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2}>
            <Pagination count={bookTotalPage} page={localPage} onChange={handleLocalPageChange} />
          </Stack>
        </Box>
      </Box>

      <Subscribe />
    </Box>
  );
};

export default Books;
