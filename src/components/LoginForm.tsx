import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Avatar, Button, TextField, Box, Typography, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { LoginRequest } from '../types/account';

type LoginFormProps = {
  handleSetForm: () => void;
  handleLogin: ({ email, password }: LoginRequest) => void;
};

const LoginForm = ({ handleSetForm, handleLogin }: LoginFormProps) => {
  const [passVisibility, setPassVisibility] = useState<boolean>(false);

  const loginCredential = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email required'),
      password: Yup.string().min(6, 'Must be at least 6 characters or more').required('Password required'),
    }),
    onSubmit: (value) => {
      handleLogin({ email: value.email, password: value.password });
    },
  });

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
      <Box component='form' onSubmit={loginCredential.handleSubmit} sx={{ mt: 1, width: '100%' }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
          onChange={loginCredential.handleChange}
          value={loginCredential.values.email}
        />
        {loginCredential.touched.email && loginCredential.errors.email ? (
          <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{loginCredential.errors.email}</Typography>
        ) : null}
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type={passVisibility ? 'text' : 'password'}
          id='password'
          autoComplete='current-password'
          onChange={loginCredential.handleChange}
          value={loginCredential.values.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {passVisibility ? (
                  <VisibilityOffIcon onClick={() => setPassVisibility(!passVisibility)} sx={{ cursor: 'pointer' }} />
                ) : (
                  <VisibilityIcon onClick={() => setPassVisibility(!passVisibility)} sx={{ cursor: 'pointer' }} />
                )}
              </InputAdornment>
            ),
          }}
        />

        {loginCredential.touched.password && loginCredential.errors.password ? (
          <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{loginCredential.errors.password}</Typography>
        ) : null}
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
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
