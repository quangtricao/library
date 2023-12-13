import { createBrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Book from '../pages/Book';
import Books from '../pages/Books';
import Authors from '../pages/Authors';
import Account from '../pages/Account';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import BookEdit from '../pages/BookEdit';
import AccountEdit from '../pages/AccountEdit';
import ProtectedRoute from '../components/CheckLogin';
import CheckAdmin from '../components/CheckAdmin';

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
            <CheckAdmin>
              <AccountEdit />
            </CheckAdmin>
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
