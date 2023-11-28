import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;
