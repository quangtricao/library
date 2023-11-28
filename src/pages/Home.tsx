import { Box } from '@mui/material';

import Introduction from '../components/Introduction';
import BooksTrending from '../components/BooksTrending';
import BooksFeatured from '../components/BooksFeatured';
import Service from '../components/Service';
import BooksBestSellers from '../components/BooksBestSellers';
import Books10TopRated from '../components/Books10TopRated';
import Statistics from '../components/Statistics';
import Subscribe from '../components/Subscribe';

const Home = () => {
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
