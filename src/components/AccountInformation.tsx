import { Box } from '@mui/material';
import { AccountType } from '../types/account';

type AccountInformationType = {
  account: AccountType;
};

const AccountInformation = ({ account }: AccountInformationType) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src={account.image}
        alt={`Avatar of ${account.firstName}`}
        style={{ width: '300px', borderRadius: '30px' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>{account.firstName}</Box>
        <Box>{account.lastName}</Box>
        <Box>{account.email}</Box>
        <Box>{account.role}</Box>
      </Box>
    </Box>
  );
};

export default AccountInformation;
