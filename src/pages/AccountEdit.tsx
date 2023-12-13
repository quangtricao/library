import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import Loading from '../components/Loading';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { getProfile } from '../services/accountService';
import { getTokenFromLocalStorage } from '../utils/localStorage';

const AccountEdit = () => {
  const dispatch = useAppDispatch();
  const [updateAccount, setUpdateAccount] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (token) {
      dispatch(getProfile(token))
        .unwrap()
        .then((response) => {
          const account = response.data;
          setUpdateAccount({
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            image: account.image,
          });
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!updateAccount) {
    return <Loading />;
  }

  return (
    <Box sx={{ maxWidth: '50%', marginX: 'auto', marginY: '100px', minHeight: '600px' }}>
      <Link to={`/account`} style={{ textDecoration: 'none' }}>
        <Button startIcon={<ArrowLeftIcon />} variant='text' sx={{ marginY: '30px', color: 'primary.main' }}>
          Back to profile
        </Button>
      </Link>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', marginX: 'auto', gap: '20px' }}>
        <Box>
          Firstname: <TextField value={updateAccount.firstName} variant='standard' sx={{ paddingX: '20px' }} />
        </Box>
        <Box>
          Lastname: <TextField value={updateAccount.lastName} variant='standard' sx={{ paddingX: '20px' }} />
        </Box>

        <Box>
          Email: <TextField value={updateAccount.email} variant='standard' sx={{ paddingX: '20px' }} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <TextField label='Images' variant='standard' />
          <img
            src={updateAccount.image}
            alt={`${updateAccount.firstName}`}
            style={{ height: '150px', width: '150px', objectFit: 'contain' }}
          />
        </Box>
        <Button size='large' variant='contained' fullWidth>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default AccountEdit;
