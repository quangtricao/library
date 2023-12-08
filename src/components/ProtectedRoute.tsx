import { getAccountFromLocalStorage } from '../utils/localStorage';
import Login from './Login';

type ProtectedRouteProp = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProp) => {
  const user = getAccountFromLocalStorage();

  if (!user || !user.email) {
    return <Login />;
  }

  return children;
};

export default ProtectedRoute;
