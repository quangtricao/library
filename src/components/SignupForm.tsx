import { Avatar, Button, TextField, Grid, Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { SignupRequest } from '../types/account';

type LoginFormProps = {
  handleSetForm: () => void;
  handleSignup: ({ email, password }: SignupRequest) => void;
};

const SignUpForm = ({ handleSetForm, handleSignup }: LoginFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get('firstName')?.toString();
    const lastName = data.get('lastName')?.toString();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    const image = data.get('image')?.toString();

    if (firstName && lastName && email && password && image) {
      handleSignup({ email, password, image, firstName, lastName });
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
        Sign up
      </Typography>
      <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              required
              fullWidth
              id='firstName'
              label='First Name'
              name='firstName'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required fullWidth id='lastName' label='Last Name' name='lastName' />
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth id='email' label='Email Address' name='email' />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth name='image' label='image' id='image' />
          </Grid>
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
