import Layout1 from '../layouts/Layout1';
import Layout2 from '../layouts/Layout2';
import RoutingList from '../components/RoutingList';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

import Dashboard from '../pages/Dashboard';

const routesConfig = [
  {
    element: <Layout1 />,
    children: [
      { path: '/', element: <RoutingList Component={Login} /> },
      { path: '/signup', element: <RoutingList Component={Signup} /> },
    
    ],
  },
  {
    element: <Layout2 />,
    children: [
      { path: '/dashboard', element: <RoutingList Component={Dashboard} /> },
    ],
  },
];

export default routesConfig;
