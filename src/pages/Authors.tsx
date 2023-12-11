import { useEffect, useState } from 'react';
import { Box, Button, Grid, Pagination, Stack } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuthors } from '../services/authorsService';
import { getBooksAuthors } from '../services/booksAuthorsService';

import { IDLE } from '../types/status';

const Authors = () => {
  const dispatch = useAppDispatch();
  const authors = useAppSelector((state) => state.authors.authors);
  const authorStatus = useAppSelector((state) => state.authors.status);
  const authorTotalPage = useAppSelector((state) => state.authors.pagination.totalPages);

  const booksAuthors = useAppSelector((state) => state.booksAuthors.books);
  const booksAuthorsTotalPage = useAppSelector((state) => state.booksAuthors.pagination.totalPages);

  const [booksLocalPage, setBooksLocalPage] = useState<number>(1);
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
    console.log(authorId);

    dispatch(getBooksAuthors({ authorId, pagination: {} }));
  };

  const handleBooksAuthorsLocalPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getBooksAuthors({ authorId: '123', pagination: { page: value, limit: 6 } }));
    setBooksAuthorsLocalPage(value);
  };

  return (
    <Box sx={{ maxWidth: '80%', marginX: 'auto' }}>
      <Box>
        <Grid container spacing={5} columns={5} sx={{ marginTop: '30px' }}>
          {authors.map((author) => (
            <Grid key={author._id} item xs={1}>
              <Box
                sx={{
                  borderRadius: '75px',
                  height: '150px',
                  width: '150px',
                  backgroundColor: 'red',
                  backgroundImage: `url("https://picsum.photos/150")`,
                }}
              ></Box>
              <Button onClick={(event) => handleBooksAuthorsFetch(event, author._id)}>
                {author.name}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2}>
          <Pagination
            count={authorTotalPage}
            page={booksLocalPage}
            onChange={handleBooksLocalPageChange}
          />
        </Stack>
      </Box>

      <Box sx={{ marginTop: '30px' }}>
        <Grid container spacing={5} columns={5} sx={{ marginTop: '30px' }}>
          {booksAuthors.length === 0
            ? 'No Book'
            : booksAuthors.map((book) => (
                <Grid key={book._id} item xs={1}>
                  {book.title}
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
    </Box>
  );
};

export default Authors;
