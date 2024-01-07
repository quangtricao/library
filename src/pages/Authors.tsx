import { useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination, Stack } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuthors, getSingleAuthor } from '../services/authorsService';
import { getBooksAuthors } from '../services/booksAuthorsService';

import { IDLE } from '../types/status';
import { AuthorType } from '../types/author';
import { clearBooksAuthors } from '../redux/slices/booksAuthorsSlice';
import { setNotification } from '../redux/slices/notificationSlice';

import BookPreview from '../components/BookPreview';
import AuthorPreview from '../components/AuthorPreview';
import AuthorDetail from '../components/AuthorDetail';

const Authors = () => {
  const dispatch = useAppDispatch();
  const authors = useAppSelector((state) => state.authors.authors);
  const authorStatus = useAppSelector((state) => state.authors.status);
  const authorPage = useAppSelector((state) => state.authors.pagination.page);
  const authorTotalPage = useAppSelector((state) => state.authors.pagination.totalPages);

  const booksAuthors = useAppSelector((state) => state.booksAuthors.books);
  const booksAuthorsTotalPage = useAppSelector((state) => state.booksAuthors.pagination.totalPages);

  const [singleAuthor, setSingleAuthor] = useState<AuthorType | null>(null);
  const [authorsLocalPage, setBooksLocalPage] = useState<number>(1);
  const [booksAuthorsLocalPage, setBooksAuthorsLocalPage] = useState<number>(1);

  useEffect(() => {
    dispatch(clearBooksAuthors());
    if (authorStatus === IDLE) {
      dispatch(getAuthors({ limit: 4 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBooksLocalPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getAuthors({ page: value, limit: 4 }));
    setBooksLocalPage(value);
  };

  const handleBooksAuthorsFetch = async (_event: React.ChangeEvent<unknown>, authorId: string) => {
    await dispatch(getBooksAuthors({ authorId, pagination: { limit: 4 } }));
    const response = await dispatch(getSingleAuthor(authorId)).unwrap();
    setSingleAuthor(response.data);
    dispatch(setNotification({ message: `Choose ${response.data.name} books`, type: 'success' }));
  };

  const handleBooksAuthorsLocalPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getBooksAuthors({ authorId: booksAuthors[0].authors[0]._id, pagination: { page: value, limit: 4 } }));
    setBooksAuthorsLocalPage(value);
  };

  return (
    <Container maxWidth='lg' sx={{ marginY: '50px' }}>
      <Grid container columns={{ xs: 1, sm: 2, md: 4 }} spacing={3}>
        {authors.map((author) => (
          <Grid key={author._id} item xs={1}>
            <AuthorPreview author={author} handleBooksAuthorsFetch={handleBooksAuthorsFetch} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ paddingTop: '20px' }}>
        <Pagination
          count={authorTotalPage}
          page={authorPage ? authorPage : authorsLocalPage}
          onChange={handleBooksLocalPageChange}
        />
      </Stack>

      {singleAuthor ? <AuthorDetail singleAuthor={singleAuthor} /> : null}

      {booksAuthors.length === 0 ? (
        <Box sx={{ marginTop: '50px', height: '500px' }}></Box>
      ) : (
        <Box sx={{ marginTop: '30px' }}>
          <Grid container columns={{ xs: 1, sm: 2, md: 4 }}>
            {booksAuthors.map((book) => (
              <Grid key={book._id} item xs={1} sx={{ padding: '10px' }}>
                <BookPreview book={book} />
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
    </Container>
  );
};

export default Authors;
