import { useEffect } from 'react';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProfile } from '../services/accountService';

import { getTokenFromLocalStorage } from '../utils/localStorage';
import Introduction from '../components/Introduction';
import BooksTrending from '../components/BooksTrending';
import Service from '../components/Service';
import Subscribe from '../components/Subscribe';

const Home = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account.account);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token && account === null) {
      dispatch(getProfile(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
