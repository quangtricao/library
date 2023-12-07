import { Box } from '@mui/material';
import { useState } from 'react';

import { useAppDispatch } from '../redux/hooks';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';
import { getProfile, login, signup } from '../redux/slices/accountSlice';
import { LoginRequest, SignupRequest } from '../types/authentication';
import { saveTokenToLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<boolean>(true);

  const handleSetForm = () => {
    setForm(!form);
  };

  const handleLogin = async ({ email, password }: LoginRequest) => {
    const response = await dispatch(login({ email, password })).unwrap();
    if (typeof response === 'string') {
      console.log(response);
    } else {
      const token = response.data.accessToken;
      saveTokenToLocalStorage(token);
      dispatch(getProfile(token));
      navigate('/');
    }
  };

  const handleSignup = async ({ email, password, image, firstName, lastName }: SignupRequest) => {
    const response = await dispatch(signup({ email, password, image, firstName, lastName }));
    console.log(response);
  };

  return (
    <Box sx={{ minHeight: '600px' }}>
      {form ? (
        <LoginForm handleSetForm={handleSetForm} handleLogin={handleLogin} />
      ) : (
        <SignUpForm handleSetForm={handleSetForm} handleSignup={handleSignup} />
      )}
    </Box>
  );
};

export default Login;
