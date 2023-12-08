import { Box } from '@mui/material';
import { useEffect } from 'react';

import Introduction from '../components/Introduction';
import BooksTrending from '../components/BooksTrending';
import BooksFeatured from '../components/BooksFeatured';
import Service from '../components/Service';
import BooksBestSellers from '../components/BooksBestSellers';
import Books10TopRated from '../components/Books10TopRated';
import Statistics from '../components/Statistics';
import Subscribe from '../components/Subscribe';

import { IDLE } from '../types/status';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProfile } from '../services/accountService';
import { getGenres } from '../services/genresService';
import { getBooks } from '../services/booksService';
import { getAuthors } from '../services/authorsService';
import { getTokenFromLocalStorage } from '../utils/localStorage';

const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.account);
  const genresStatus = useAppSelector((state) => state.genres.status);
  const booksStatus = useAppSelector((state) => state.books.status);
  const authorsStatus = useAppSelector((state) => state.authors.status);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token && user === null) {
      dispatch(getProfile(token));
    }
    if (booksStatus === IDLE) {
      dispatch(getBooks({}));
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
      <BooksFeatured />
      <Service />
      <BooksBestSellers />
      <Books10TopRated />
      <Statistics />
      <Subscribe />
    </Box>
  );
};

export default Home;
