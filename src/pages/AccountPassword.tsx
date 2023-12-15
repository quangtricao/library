import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import { useAppDispatch } from '../redux/hooks';
import { getTokenFromLocalStorage } from '../utils/localStorage';
import { changePassword } from '../services/accountService';
import { setNotification } from '../redux/slices/notificationSlice';

const AccountPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = getTokenFromLocalStorage();
  const updatePassword = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().min(6, 'Must be at least 6 characters or more').required('Password required'),
      newPassword: Yup.string().min(6, 'Must be at least 6 characters or more').required('Password required'),
      confirmNewPassword: Yup.string().min(6, 'Must be at least 6 characters or more').required('Password required'),
    }),
    onSubmit: async (value) => {
      if (token) {
        const response = await dispatch(
          changePassword({ token, oldPassword: value.oldPassword, newPassword: value.newPassword })
        ).unwrap();
        if (typeof response === 'string') {
          dispatch(
            setNotification({
              message: 'Fail to update password. Please check if everything is correct.',
              type: 'error',
            })
          );
          return;
        }
        dispatch(setNotification({ message: 'Update password successfully', type: 'success' }));
        navigate('/account');
        return;
      }

      dispatch(setNotification({ message: 'Token is missing', type: 'error' }));
      return;
    },
  });

  return (
    <Box sx={{ maxWidth: '50%', marginX: 'auto', marginY: '100px', minHeight: '600px' }}>
      <Link to={'/account'} style={{ textDecoration: 'none' }}>
        <Button startIcon={<ArrowLeftIcon />} variant='text' sx={{ marginY: '30px', color: 'primary.main' }}>
          Back to profile
        </Button>
      </Link>
      <Box
        component='form'
        onSubmit={updatePassword.handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', width: '80%', marginX: 'auto', gap: '20px' }}
      >
        <Box>
          Old password:
          <TextField
            id='oldPassword'
            size='small'
            variant='standard'
            sx={{ paddingX: '10px' }}
            onChange={updatePassword.handleChange}
            value={updatePassword.values.oldPassword}
          />
        </Box>
        {updatePassword.touched.oldPassword && updatePassword.errors.oldPassword ? (
          <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{updatePassword.errors.oldPassword}</Typography>
        ) : null}
        <Box>
          New password:{' '}
          <TextField
            id='newPassword'
            size='small'
            variant='standard'
            sx={{ paddingX: '10px' }}
            onChange={updatePassword.handleChange}
            value={updatePassword.values.newPassword}
          />
        </Box>
        {updatePassword.touched.newPassword && updatePassword.errors.newPassword ? (
          <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{updatePassword.errors.newPassword}</Typography>
        ) : null}
        <Box>
          Confirm new password:{' '}
          <TextField
            id='confirmNewPassword'
            size='small'
            variant='standard'
            sx={{ paddingX: '10px' }}
            onChange={updatePassword.handleChange}
            value={updatePassword.values.confirmNewPassword}
          />
        </Box>
        {updatePassword.touched.confirmNewPassword && updatePassword.errors.confirmNewPassword ? (
          <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{updatePassword.errors.confirmNewPassword}</Typography>
        ) : null}
        <Button type='submit' size='large' variant='contained' fullWidth>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default AccountPassword;
