import DefaultLayout from '../layouts/Default.layout';
import Home from '../views/Home';

const protectedRoutes = [
  {
    path: '/home',
    exact: true,
    layout: DefaultLayout,
    roles: ['admin', 'user'],
    element: Home,
  },
];

export default protectedRoutes;