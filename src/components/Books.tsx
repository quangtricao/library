import { useState, ChangeEvent } from 'react';
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getBooks } from '../services/booksService';

import sadpepe from '../assets/img/sadpepe.png';
import BookPreview from './BookPreview';

const Books = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);
  const books = useAppSelector((state) => state.books.books);
  const bookPage = useAppSelector((state) => state.books.pagination.page);
  const bookTotalPage = useAppSelector((state) => state.books.pagination.totalPages);
  const [localPage, setLocalPage] = useState<number>(1);

  const handleLocalPageChange = (_event: ChangeEvent<unknown>, value: number) => {
    dispatch(getBooks({ ...filter, pagination: { page: value, limit: 8 } }));
    setLocalPage(value);
  };

  if (books.length === 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '450px' }}>
        <img src={sadpepe} alt='a sad pepe' style={{ height: '150px' }} />
        <Typography>Sorry, no matching books are found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ marginY: 3 }}>
      <Grid container columns={{ sm: 2, md: 4 }} spacing={4}>
        {books.map((book) => (
          <Grid key={book._id} item xs={1}>
            <BookPreview book={book} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={1} sx={{ marginTop: '50px', display: 'flex', alignItems: 'center' }}>
        <Pagination
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
