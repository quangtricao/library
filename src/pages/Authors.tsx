import { useEffect, useState } from 'react';
import { Box, Button, Grid, Pagination, Stack } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuthors } from '../services/authorsService';
import { getBooksAuthors } from '../services/booksAuthorsService';

import { IDLE, LOADING } from '../types/status';
import BookPreview from '../components/BookPreview';
import Loading from '../components/Loading';

const Authors = () => {
  const dispatch = useAppDispatch();
  const authors = useAppSelector((state) => state.authors.authors);
  const authorStatus = useAppSelector((state) => state.authors.status);
  const authorTotalPage = useAppSelector((state) => state.authors.pagination.totalPages);

  const booksAuthors = useAppSelector((state) => state.booksAuthors.books);
  const booksAuthorsTotalPage = useAppSelector((state) => state.booksAuthors.pagination.totalPages);

  const [authorsLocalPage, setBooksLocalPage] = useState<number>(1);
  const [booksAuthorsLocalPage, setBooksAuthorsLocalPage] = useState<number>(1);

  useEffect(() => {
    if (authorStatus === IDLE) {
      dispatch(getAuthors({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBooksLocalPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getAuthors({ page: value }));
    setBooksLocalPage(value);
  };

  const handleBooksAuthorsFetch = (_event: React.ChangeEvent<unknown>, authorId: string) => {
    dispatch(getBooksAuthors({ authorId, pagination: {} }));
  };

  const handleBooksAuthorsLocalPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getBooksAuthors({ authorId: booksAuthors[0].authors[0]._id, pagination: { page: value } }));
    setBooksAuthorsLocalPage(value);
  };

  if (authorStatus === LOADING) {
    return <Loading />;
  }

  return (
    <Box sx={{ maxWidth: '80%', marginX: 'auto', marginY: '100px' }}>
      <Box>
        <Grid container spacing={5} columns={5}>
          {authors.map((author) => (
            <Grid key={author._id} item xs={1}>
              <img
                src={author.image}
                alt={`Author ${author.name}`}
                style={{ height: '200px', width: '200px', objectFit: 'cover', borderRadius: '100px' }}
              />
              <Button onClick={(event) => handleBooksAuthorsFetch(event, author._id)}>{author.name}</Button>
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2}>
          <Pagination count={authorTotalPage} page={authorsLocalPage} onChange={handleBooksLocalPageChange} />
        </Stack>
      </Box>

      {booksAuthors.length === 0 ? (
        <Box sx={{ marginTop: '50px', minHeight: '500px' }}></Box>
      ) : (
        <Box sx={{ marginTop: '50px' }}>
          <Grid container columns={4} sx={{ marginTop: '30px' }}>
            {booksAuthors.map((book) => (
              <Grid key={book._id} item xs={1} sx={{ padding: '50px' }}>
                <BookPreview book={book} imgHeight='400px' />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2}>
            <Pagination
              count={booksAuthorsTotalPage}
              page={booksAuthorsLocalPage}
              onChange={handleBooksAuthorsLocalPageChange}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Authors;
