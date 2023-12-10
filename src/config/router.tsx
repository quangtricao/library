import { createBrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Book from '../pages/Book'
import Books from '../pages/Books';
import Authors from '../pages/Authors';
import Genres from '../pages/Genres';
import Account from '../pages/Account';
import ProtectedRoute from '../components/ProtectedRoute';

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
        path: '/books/:isbn',
        element: <Book />,
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
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
