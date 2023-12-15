import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAppDispatch } from '../redux/hooks';
import { getProfile, login } from '../services/accountService';

import { LoginRequest } from '../types/account';
import { clearCartFromLocalStorage, saveTokenToLocalStorage } from '../utils/localStorage';
import LoginForm from '../components/LoginForm';
import { clearCart } from '../redux/slices/cartSlice';
import { setNotification } from '../redux/slices/notificationSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSetForm = () => {
    navigate('/account/signup');
  };

  const handleLogin = async ({ email, password }: LoginRequest) => {
    const response = await dispatch(login({ email, password })).unwrap();
    if (typeof response === 'string') {
      dispatch(setNotification({ message: 'Email or password wrong', type: 'error' }));
    } else {
      const token = response.data.accessToken;
      saveTokenToLocalStorage(token);
      dispatch(clearCart());
      clearCartFromLocalStorage();
      await dispatch(getProfile(token));
      dispatch(setNotification({ message: 'Login successfully', type: 'success' }));
      navigate('/');
    }
  };

  return (
    <Box sx={{ minHeight: '600px' }}>
      <LoginForm handleSetForm={handleSetForm} handleLogin={handleLogin} />
    </Box>
  );
};

export default Login;
