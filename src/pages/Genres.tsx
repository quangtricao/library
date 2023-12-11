import { useEffect, useState } from 'react';
import { Box, Button, Grid, Pagination, Stack } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getGenres } from '../services/genresService';
import { getBooksAuthors } from '../services/booksAuthorsService';

import { IDLE } from '../types/status';

const Genres = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.genres.genres);
  const genreStatus = useAppSelector((state) => state.genres.status);
  const genreTotalPage = useAppSelector((state) => state.genres.pagination.totalPages);

  const booksGenres = useAppSelector((state) => state.booksGenres.books);
  const booksGenresTotalPage = useAppSelector((state) => state.booksGenres.pagination.totalPages);

  const [genresLocalPage, setGenresLocalPage] = useState<number>(1);
  const [booksGenresLocalPage, setBooksGenresLocalPage] = useState<number>(1);

  useEffect(() => {
    if (genreStatus === IDLE) {
      dispatch(getGenres({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBooksLocalPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getGenres({ page: value }));
    setGenresLocalPage(value);
  };

  const handleBooksAuthorsFetch = (_event: React.ChangeEvent<unknown>, authorId: string) => {
    dispatch(getBooksAuthors({ authorId, pagination: {} }));
  };

  const handleBooksAuthorsLocalPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getBooksAuthors({ authorId: '123', pagination: { page: value, limit: 6 } }));
    setBooksGenresLocalPage(value);
  };

  return (
    <Box sx={{ maxWidth: '80%', marginX: 'auto' }}>
      <Box>
        <Grid container spacing={5} columns={3} sx={{ marginTop: '30px' }}>
          {genres.map((genre) => (
            <Grid key={genre._id} item xs={1}>
              <Box
                sx={{
                  borderRadius: '75px',
                  height: '150px',
                  width: '150px',
                  backgroundColor: 'red',
                  backgroundImage: `url("https://picsum.photos/150")`,
                }}
              ></Box>
              <Button onClick={(event) => handleBooksAuthorsFetch(event, genre._id)}>
                {genre.title}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2}>
          <Pagination
            count={genreTotalPage}
            page={genresLocalPage}
            onChange={handleBooksLocalPageChange}
          />
        </Stack>
      </Box>

      <Box sx={{ marginTop: '30px' }}>
        <Grid container spacing={5} columns={5} sx={{ marginTop: '30px' }}>
          {booksGenres.length === 0
            ? 'No Book'
            : booksGenres.map((book) => (
                <Grid key={book._id} item xs={1}>
                  {book.title}
                </Grid>
              ))}
        </Grid>
        <Stack spacing={2}>
          <Pagination
            count={booksGenresTotalPage}
            page={booksGenresLocalPage}
            onChange={handleBooksAuthorsLocalPageChange}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Genres;
