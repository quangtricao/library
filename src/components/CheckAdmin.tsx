import { Box, Button, Typography } from '@mui/material';
import { getAccountFromLocalStorage } from '../utils/localStorage';
import { Link } from 'react-router-dom';

type CheckAdminProp = {
  children: JSX.Element;
};

const CheckAdmin = ({ children }: CheckAdminProp) => {
  const account = getAccountFromLocalStorage();

  if (account?.role !== 'ADMIN') {
    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            height: '600px',
            width: '100vw',
            transform: 'translate(40%, 30%)',
          }}
        >
          <Typography>Stop right there. Only admins can access.</Typography>
          <Link to='/'>
            <Button variant='contained'>Understand. Take me back home</Button>
          </Link>
          <Link to='/account/login'>
            <Button color='error' variant='contained'>
              No. Let me try another account
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }

  return children;
};

export default CheckAdmin;
