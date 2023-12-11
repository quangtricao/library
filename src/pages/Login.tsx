import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAppDispatch } from '../redux/hooks';
import { getProfile, login } from '../services/accountService';

import { LoginRequest } from '../types/account';
import { saveTokenToLocalStorage } from '../utils/localStorage';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSetForm = () => {
    navigate('/account/signup');
  };

  const handleLogin = async ({ email, password }: LoginRequest) => {
    const response = await dispatch(login({ email, password })).unwrap();
    if (typeof response === 'string') {
      console.log(response);
    } else {
      const token = response.data.accessToken;
      saveTokenToLocalStorage(token);
      await dispatch(getProfile(token));
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
