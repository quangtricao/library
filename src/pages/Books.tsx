import { useState, ChangeEvent, useEffect } from 'react';
import { Box, Checkbox, Grid, Typography, Pagination, Stack, Button, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getBooks } from '../services/booksService';
import { getGenres, getAndPushGenres } from '../services/genresService';

import { IDLE, LOADING } from '../types/status';
import BookPreview from '../components/BookPreview';
import BookPreviewButton from '../components/BookPreviewButton';
import Loading from '../components/Loading';

const Books = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const bookPage = useAppSelector((state) => state.books.pagination.page);
  const bookTotalPage = useAppSelector((state) => state.books.pagination.totalPages);
  const bookStatus = useAppSelector((state) => state.books.status);

  const genres = useAppSelector((state) => state.genres.genres);
  const genrePage = useAppSelector((state) => state.genres.pagination.page);
  const genreStatus = useAppSelector((state) => state.genres.status);

  const account = useAppSelector((state) => state.account.account);

  const [localPage, setLocalPage] = useState<number>(1);

  const [filter, setFilter] = useState({
    title: '',
    borrowed: false,
    available: false,
  });

  useEffect(() => {
    if (bookStatus === IDLE) {
      dispatch(getBooks({ pagination: { limit: 8 } }));
    }
    if (genreStatus === IDLE) {
      dispatch(getGenres({ limit: 3 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocalPageChange = (_event: ChangeEvent<unknown>, value: number) => {
    dispatch(getBooks({ pagination: { page: value, limit: 8 } }));
    setLocalPage(value);
  };

  const handleLoadMoreGenres = () => {
    dispatch(getAndPushGenres({ page: genrePage + 1, limit: 3 }));
  };

  const handleFilter = () => {
    setFilter({ title: '', borrowed: false, available: false });
    dispatch(
      getBooks({
        title: filter.title,
        borrowed: filter.borrowed,
        available: filter.available,
        pagination: { limit: 8 },
      })
    );
  };

  if (bookStatus === LOADING) {
    return <Loading />;
  }

  return (
    <Box sx={{ maxWidth: '80%', marginX: 'auto', marginY: '50px' }}>
      <Box sx={{ display: 'flex', gap: '30px' }}>
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

        <Box sx={{ width: '100%' }}>
          <Typography sx={{ fontSize: '30px' }}>Books</Typography>
          <Grid container columns={4}>
            {books.map((book) => (
              <Grid key={book._id} item xs={1} sx={{ padding: '10px' }}>
                <BookPreview book={book} imgHeight='400px' />
                <BookPreviewButton book={book} isLogin={account ? true : false} />
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
