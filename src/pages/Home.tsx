import { useEffect } from 'react';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProfile } from '../services/accountService';

import { getTokenFromLocalStorage } from '../utils/localStorage';
import Introduction from '../components/Introduction';
import BooksTrending from '../components/BooksTrending';
import Service from '../components/Service';
import Subscribe from '../components/Subscribe';
import { IDLE } from '../types/status';
import { getBooks } from '../services/booksService';
import Loading from '../components/Loading';

const Home = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account.account);
  const books = useAppSelector((state) => state.books.books);
  const bookStatus = useAppSelector((state) => state.books.status);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token && account === null) {
      dispatch(getProfile(token));
    }
    if (bookStatus === IDLE) {
      dispatch(getBooks({ pagination: { limit: 8 } }));
    }
    dispatch(getBooks({ pagination: { limit: 8 } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (books.length === 0) {
    return <Loading />;
  }

  return (
    <Box>
      <Introduction />
      <BooksTrending books={books} />
      <Service />
      <Subscribe />
    </Box>
  );
};

export default Home;
