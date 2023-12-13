import { useEffect } from 'react';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProfile } from '../services/accountService';
import { getBooks } from '../services/booksService';

import { IDLE, LOADING } from '../types/status';
import { getTokenFromLocalStorage } from '../utils/localStorage';
import Introduction from '../components/Introduction';
import BooksTrending from '../components/BooksTrending';
import Service from '../components/Service';
import Subscribe from '../components/Subscribe';
import Loading from '../components/Loading';

const Home = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account.account);
  const booksStatus = useAppSelector((state) => state.books.status);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token && account === null) {
      dispatch(getProfile(token));
    }
    if (booksStatus === IDLE) {
      dispatch(getBooks({ limit: 8 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (booksStatus === LOADING) {
    return <Loading />;
  }

  return (
    <Box>
      <Introduction />
      <BooksTrending />
      <Service />
      <Subscribe />
    </Box>
  );
};

export default Home;
