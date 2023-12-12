import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAppDispatch } from '../redux/hooks';
import { signup } from '../services/accountService';

import { SignupRequest } from '../types/account';
import SignUpForm from '../components/SignupForm';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSetForm = () => {
    navigate('/account/login');
  };

  const handleSignup = async ({ email, password, image, firstName, lastName }: SignupRequest) => {
    console.log({ email, password, image, firstName, lastName });

    const response = await dispatch(signup({ email, password, image, firstName, lastName })).unwrap();
    if (typeof response === 'string') {
      console.log(response);
      return;
    }

    navigate('/account/login');
  };

  return (
    <Box sx={{ minHeight: '600px' }}>
      <SignUpForm handleSetForm={handleSetForm} handleSignup={handleSignup} />
    </Box>
  );
};

export default Signup;
