import { Box, Button } from '@mui/material';
import { AccountType } from '../types/account';
import { Link } from 'react-router-dom';

type AccountInformationType = {
  account: AccountType;
};

const AccountInformation = ({ account }: AccountInformationType) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content', marginX: 'auto' }}>
      <img
        src={account.image}
        alt={`Avatar of ${account.firstName}`}
        style={{ width: '200px', borderRadius: '100px' }}
      />
      <Box>
        {account.firstName.toUpperCase()} {account.lastName.toUpperCase()}
      </Box>
      <Box></Box>
      <Box>Email: {account.email}</Box>
      <Box>Role: {account.role.toLowerCase()}</Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Link to={`/account/${account._id}/edit`}>
          <Button size='small' variant='contained'>
            Update account
          </Button>
        </Link>
        <Link to={`/account/${account._id}/password`}>
          <Button size='small' variant='contained' color='warning'>
            Change password
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AccountInformation;
