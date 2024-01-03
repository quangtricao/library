import { createBrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Book from '../pages/Book';
import Authors from '../pages/Authors';
import Account from '../pages/Account';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import BookEdit from '../pages/BookEdit';
import AccountEdit from '../pages/AccountEdit';
import ProtectedRoute from '../components/CheckLogin';
import CheckAdmin from '../components/CheckAdmin';
import AccountPassword from '../pages/AccountPassword';

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
        path: '/books/:isbn',
        element: <Book />,
      },
      {
        path: '/books/:isbn/edit',
        element: (
          <ProtectedRoute>
            <CheckAdmin>
              <BookEdit />
            </CheckAdmin>
          </ProtectedRoute>
        ),
      },
      {
        path: '/authors',
        element: <Authors />,
      },
      {
        path: '/genres',
        element: <Authors />,
      },
      {
        path: '/account',
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: '/account/:id/edit',
        element: (
          <ProtectedRoute>
            <AccountEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: '/account/:id/password',
        element: (
          <ProtectedRoute>
            <AccountPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: '/account/login',
        element: <Login />,
      },
      {
        path: '/account/signup',
        element: <Signup />,
      },
    ],
  },
]);

export default router;
