import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, TextField, Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { LoginRequest } from '../types/authentication';

type LoginFormProps = {
  handleSetForm: () => void;
  handleLogin: ({ email, password }: LoginRequest) => void;
};

const LoginForm = ({ handleSetForm, handleLogin }: LoginFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    if (email && password) {
      handleLogin({ email, password });
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '30%',
        marginX: 'auto',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <Box sx={{ fontSize: '12px', marginTop: '10px' }}>
          <Link to='#'>Forgot your Password?</Link>
        </Box>
        <Box sx={{ fontSize: '12px', marginTop: '5px' }}>
          Not a member?{' '}
          <Button onClick={handleSetForm} sx={{ fontSize: '12px' }}>
            Sign up now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
