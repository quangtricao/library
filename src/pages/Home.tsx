import { Box } from '@mui/material';

import Introduction from '../components/Introduction';
import BooksTrending from '../components/BooksTrending';
import BooksFeatured from '../components/BooksFeatured';
import Service from '../components/Service';
import BooksBestSellers from '../components/BooksBestSellers';
import Books10TopRated from '../components/Books10TopRated';
import Statistics from '../components/Statistics';
import Subscribe from '../components/Subscribe';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { fetchBooks } from '../redux/slices/booksSlice';
import { PaginationRequestParams } from '../types/pagination';

const Home = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books);
  const status = useAppSelector((state) => state.books.status);
  console.log(books);

  // TODO:  useMemo
  const paginationObj: PaginationRequestParams = {
    page: 1,
    limit: 50,
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks(paginationObj));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, status]);

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
