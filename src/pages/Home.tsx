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

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProfile } from '../redux/slices/accountSlice';
import { getTokenFromLocalStorage } from '../utils/localStorage';

const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.account);
  console.log(user?.email);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token && user === null) {
      dispatch(getProfile(token));
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
