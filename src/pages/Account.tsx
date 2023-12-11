import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks';

const Account = () => {
  const navigate = useNavigate();
  const account = useAppSelector((state) => state.account.account);
  const booksInCart = useAppSelector((state) => state.cart.bookInCart);

  if (!account) {
    navigate('/account/login');
    return null;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <img
          src={account?.image}
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

      <Box>
        <Box>Book in Cart</Box>
        {booksInCart.map((book) => (
          <Box>{book.title}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default Account;
