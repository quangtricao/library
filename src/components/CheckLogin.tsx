import { Navigate } from 'react-router-dom';
import { getAccountFromLocalStorage } from '../utils/localStorage';

type CheckLoginProp = {
  children: JSX.Element;
};

const CheckLogin = ({ children }: CheckLoginProp) => {
  const account = getAccountFromLocalStorage();

  if (!account) {
    return <Navigate to='/account/login' />;
  }

  return children;
};

export default CheckLogin;
