import { createBrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Books from '../pages/Books';
import Authors from '../pages/Authors';
import Genres from '../pages/Genres';
import Account from '../pages/Account';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/authors',
        element: <Authors />,
      },
      {
        path: '/genres',
        element: <Genres />,
      },
      {
        path: '/account',
        element: <Account />,
      },
      {
        path: '/account/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
