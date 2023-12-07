import { Navigate } from 'react-router-dom';

type ProtectedRouteProp = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProp) => {
  if (false) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
