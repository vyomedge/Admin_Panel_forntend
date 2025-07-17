import Layout1 from "../layouts/Layout1";
import Layout2 from "../layouts/Layout2";
import RoutingList from "../components/RoutingList";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PublicRoute from "../components/PublicRoute";
import Blog from "../pages/Blog";

const routesConfig = [
  {
    element: <Layout1 />,
    children: [
      {
        path: "/",
        element: (
          <PublicRoute>
            <RoutingList Component={Login} />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <Layout2 />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <RoutingList Component={Dashboard} />,
      },
      {
        path: "/blog",
        element: <RoutingList Component={Blog} />,
      },
    ],
  },
];

export default routesConfig;
