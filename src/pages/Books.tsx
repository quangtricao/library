import { Link } from 'react-router-dom';
import { Box, Checkbox, Grid, Typography, Pagination, Stack, Button } from '@mui/material';

import { IDLE, LOADING } from '../types/status';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useState, ChangeEvent, useEffect } from 'react';
import { getBooks } from '../services/booksService';
import { getGenres, getAndPushGenres } from '../services/genresService';

const Books = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const bookPage = useAppSelector((state) => state.books.pagination.page);
  const bookTotalPage = useAppSelector((state) => state.books.pagination.totalPages);
  const bookStatus = useAppSelector((state) => state.books.status);

  const genres = useAppSelector((state) => state.genres.genres);
  const genrePage = useAppSelector((state) => state.genres.pagination.page);
  const genreStatus = useAppSelector((state) => state.genres.status);

  const [localPage, setLocalPage] = useState<number>(1);

  useEffect(() => {
    if (bookStatus === IDLE) {
      dispatch(getBooks({ limit: 8 }));
    }
    if (genreStatus === IDLE) {
      dispatch(getGenres({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocalPageChange = (_event: ChangeEvent<unknown>, value: number) => {
    dispatch(getBooks({ page: value, limit: 8 }));
    setLocalPage(value);
  };

  const handleLoadMoreGenres = () => {
    dispatch(getAndPushGenres({ page: genrePage + 1 }));
  };

  if (bookStatus === LOADING) {
    return <Box>The first time loading might be slow</Box>;
  }

  return (
    <Box sx={{ maxWidth: '80%', marginX: 'auto', marginY: '50px' }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography sx={{ fontSize: '30px' }}>Filter</Typography>

          <Box>
            <Typography>Genres</Typography>
            {genres.map((genre) => (
              <Box key={genre._id}>
                <Checkbox /> {genre.title}
              </Box>
            ))}
            <Button sx={{ fontSize: '12px' }} variant='contained' onClick={handleLoadMoreGenres}>
              Load more
            </Button>
          </Box>
          <Box>
            <Typography>Status</Typography>
            <Box>
              <Checkbox /> Borrowed
            </Box>
            <Box>
              <Checkbox /> Available
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: '80%' }}>
          <Typography sx={{ fontSize: '30px' }}>Books</Typography>
          <Grid container columns={4}>
            {books.map((book) => (
              <Grid key={book._id} item xs={1} sx={{ padding: '10px' }}>
                <Link to={`/books/${book.isbn}`}>
                  <img
                    src={book.image}
                    alt={`Book ${book.title}`}
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                    }}
                  />
                </Link>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <Link to={`/books/${book.isbn}`} style={{ textDecoration: 'none' }}>
                    <Box sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {book.title.length < 20 ? book.title : book.title.slice(0, 20) + '...'}
                    </Box>
                  </Link>

                  {book.status === 'available' ? (
                    <Button variant='contained'>Borrow</Button>
                  ) : (
                    <Button variant='contained' disabled>
                      Not in Library
                    </Button>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
          <Stack spacing={1} sx={{ marginTop: '50px' }}>
            <Pagination
              size='large'
              count={bookTotalPage}
              page={bookPage ? bookPage : localPage}
              onChange={handleLocalPageChange}
              showFirstButton
              showLastButton
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Books;
