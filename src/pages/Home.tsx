import { useEffect } from 'react';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProfile } from '../services/accountService';
import { getGenres } from '../services/genresService';
import { getBooks } from '../services/booksService';
import { getAuthors } from '../services/authorsService';

import { IDLE } from '../types/status';
import { getTokenFromLocalStorage } from '../utils/localStorage';
import Introduction from '../components/Introduction';
import BooksTrending from '../components/BooksTrending';
import Service from '../components/Service';
import Statistics from '../components/Statistics';
import Subscribe from '../components/Subscribe';

const Home = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account.account);
  const genresStatus = useAppSelector((state) => state.genres.status);
  const booksStatus = useAppSelector((state) => state.books.status);
  const authorsStatus = useAppSelector((state) => state.authors.status);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token && account === null) {
      dispatch(getProfile(token));
    }
    if (booksStatus === IDLE) {
      dispatch(getBooks({ limit: 8 }));
    }
    if (genresStatus === IDLE) {
      dispatch(getGenres({}));
    }
    if (authorsStatus === IDLE) {
      dispatch(getAuthors({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Introduction />
      <BooksTrending />
      <Service />
      <Statistics />
      <Subscribe />
    </Box>
  );
};

export default Home;
