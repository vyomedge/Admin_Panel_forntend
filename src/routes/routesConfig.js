import Layout1 from '../layouts/Layout1';
import Layout2 from '../layouts/Layout2';
import RoutingList from '../components/RoutingList';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

import Dashboard from '../pages/Dashboard';

const routesConfig = [
  {
    element: <Layout1 />,
    children: [
      {
        path: '/',
        element: <RoutingList Component={Login} />,
      },
    ],
  },
  {
    element: <Layout2 />,
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <RoutingList Component={Dashboard} />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
export default routesConfig;
