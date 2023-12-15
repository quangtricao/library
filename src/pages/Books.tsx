import { useState, ChangeEvent, useEffect } from 'react';
import { Box, Grid, Typography, Pagination, Stack } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getBooks } from '../services/booksService';
import { getGenres } from '../services/genresService';

import { IDLE, LOADING } from '../types/status';
import BookPreview from '../components/BookPreview';
import BookPreviewButton from '../components/BookPreviewButton';
import Loading from '../components/Loading';
import Filter from '../components/Filter';

const Books = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const bookPage = useAppSelector((state) => state.books.pagination.page);
  const bookTotalPage = useAppSelector((state) => state.books.pagination.totalPages);
  const bookStatus = useAppSelector((state) => state.books.status);
  const account = useAppSelector((state) => state.account.account);
  const genreStatus = useAppSelector((state) => state.genres.status);
  const [localPage, setLocalPage] = useState<number>(1);

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

  if (bookStatus === LOADING) {
    return <Loading />;
  }

  return (
    <Box sx={{ maxWidth: '80%', marginX: 'auto', marginY: '50px' }}>
      <Box sx={{ display: 'flex', gap: '30px' }}>
        <Filter />

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
