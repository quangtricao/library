import { useEffect } from 'react';
import { Box, Container } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProfile } from '../services/accountService';

import { getTokenFromLocalStorage } from '../utils/localStorage';
import Introduction from '../components/Introduction';
import BooksTrending from '../components/BooksTrending';
import Service from '../components/Service';
import { IDLE } from '../types/status';
import { getBooks } from '../services/booksService';

import Loading from '../components/Loading';
import Books from '../components/Books';
import Filter from '../components/Filter';

const Home = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account.account);
  const bookStatus = useAppSelector((state) => state.books.status);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token && account === null) {
      dispatch(getProfile(token));
    }
    if (bookStatus === IDLE) {
      dispatch(getBooks({ pagination: { limit: 8 } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth='lg'>
      <Introduction />
      <BooksTrending />
      <Filter />
      {bookStatus === 'LOADING'.toLocaleLowerCase() ? <Loading /> : <Books />}
      <Service />
    </Container>
  );
};

export default Home;
