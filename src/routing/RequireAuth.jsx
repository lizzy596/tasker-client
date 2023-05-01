import { useLocation, Navigate } from 'react-router-dom';
import authService from '../services/auth.service';

const RequireAuth = ({ children }) => {
  let location = useLocation();
  const userValue = authService.userValue;
  if (!userValue)
    return <Navigate to='/login' state={{ from: location }} replace />;

  return children;
};

export default RequireAuth;
