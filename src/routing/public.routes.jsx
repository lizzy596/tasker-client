import { Navigate } from 'react-router-dom';
import DefaultLayout from '../layouts/Default.layout';
import Register from '../views/Register';
import Login from '../views/Login';

const publicRoutes = [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    element: () => <Navigate to='/login' />,
  },
  {
    path: '/register',
    exact: true,
    layout: DefaultLayout,
    element: Register,
  },
  {
    path: '/login',
    exact: true,
    layout: DefaultLayout,
    element: Login,
  },
];

export default publicRoutes;
