import { useState, ChangeEvent } from 'react';
import { Box, Grid, Pagination, Stack } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getBooks } from '../services/booksService';

import BookPreview from './BookPreview';
import BookPreviewButton from './BookPreviewButton';

const Books = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);
  const books = useAppSelector((state) => state.books.books);
  const bookPage = useAppSelector((state) => state.books.pagination.page);
  const bookTotalPage = useAppSelector((state) => state.books.pagination.totalPages);
  const account = useAppSelector((state) => state.account.account);
  const [localPage, setLocalPage] = useState<number>(1);

  const handleLocalPageChange = (_event: ChangeEvent<unknown>, value: number) => {
    dispatch(getBooks({ ...filter, pagination: { page: value, limit: 8 } }));
    setLocalPage(value);
  };

  return (
    <Box sx={{ maxWidth: '80%', marginX: 'auto', marginY: '50px' }}>
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
  );
};

export default Books;
