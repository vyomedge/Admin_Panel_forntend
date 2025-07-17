import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = Cookies.get('Admin_access');

  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
