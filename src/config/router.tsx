import { createBrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Books from '../pages/Books';
import Authors from '../pages/Authors';
import Genres from '../pages/Genres';

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
    ],
  },
]);

export default router;
