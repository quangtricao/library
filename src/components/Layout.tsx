import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Notification from './Notification';

const Layout = () => {
  return (
    <Box>
      <Header />
      <Notification />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;
