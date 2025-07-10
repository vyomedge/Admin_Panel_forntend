import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('Admin_access');
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
