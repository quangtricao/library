import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Avatar, Button, TextField, Grid, Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { SignupRequest } from '../types/account';

type LoginFormProps = {
  handleSetForm: () => void;
  handleSignup: ({ email, password }: SignupRequest) => void;
};

const SignUpForm = ({ handleSetForm, handleSignup }: LoginFormProps) => {
  const signupCredential = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      image: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, 'First name must be at least 2 charactes')
        .max(50, 'First name must be 50 charactes max')
        .required('First name required'),
      lastName: Yup.string()
        .min(2, 'Last name must be at least 2 charactes')
        .max(50, 'Last name must be 50 charactes max')
        .required('Last name required'),
      email: Yup.string().email('Invalid email address').required('Email required'),
      password: Yup.string().min(6, 'Must be at least 6 characters or more').required('Password required'),
      image: Yup.string()
        .required('Image link must be provided')
        .test('Start with https://', 'Image must start with https://', function () {
          if (this.parent['image']) {
            return this.parent['image'].startsWith('https://') ? true : false;
          }
        })
        .url(),
    }),
    onSubmit: (value) => {
      handleSignup({
        email: value.email,
        password: value.password,
        image: value.image,
        firstName: value.firstName,
        lastName: value.lastName,
      });
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
        Sign up
      </Typography>
      <Box component='form' noValidate onSubmit={signupCredential.handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              required
              fullWidth
              id='firstName'
              label='First Name'
              name='firstName'
              onChange={signupCredential.handleChange}
              value={signupCredential.values.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              onChange={signupCredential.handleChange}
              value={signupCredential.values.lastName}
            />
          </Grid>
          {signupCredential.touched.firstName && signupCredential.errors.firstName ? (
            <Grid item xs={12}>
              <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{signupCredential.errors.firstName}</Typography>
            </Grid>
          ) : null}
          {signupCredential.touched.lastName && signupCredential.errors.lastName ? (
            <Grid item xs={12}>
              <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{signupCredential.errors.lastName}</Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              onChange={signupCredential.handleChange}
              value={signupCredential.values.email}
            />
          </Grid>
          {signupCredential.touched.email && signupCredential.errors.email ? (
            <Grid item xs={12}>
              <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{signupCredential.errors.email}</Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              onChange={signupCredential.handleChange}
              value={signupCredential.values.password}
            />
          </Grid>
          {signupCredential.touched.password && signupCredential.errors.password ? (
            <Grid item xs={12}>
              <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{signupCredential.errors.password}</Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='image'
              label='image'
              id='image'
              onChange={signupCredential.handleChange}
              value={signupCredential.values.image}
            />
          </Grid>
          {signupCredential.touched.image && signupCredential.errors.image ? (
            <Grid item xs={12}>
              <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{signupCredential.errors.image}</Typography>
            </Grid>
          ) : null}
        </Grid>
        <Grid container spacing={2} columns={4} sx={{ marginY: '10px' }}>
          <Grid item xs={3}>
            <Button type='submit' fullWidth variant='contained'>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={handleSetForm} fullWidth variant='contained' color='error'>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpForm;
