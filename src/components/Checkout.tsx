import { Box, Button } from '@mui/material';
import { BookType } from '../types/book';

type CheckoutType = {
  booksToBorrow: BookType[];
  booksToReturn: BookType[];
  handleCheckout: () => void;
};

const Checkout = ({ booksToBorrow, booksToReturn, handleCheckout }: CheckoutType) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {booksToBorrow.length !== 0 || booksToReturn.length !== 0 ? (
        <Button variant='contained' sx={{ width: '50%' }} onClick={handleCheckout}>
          Checkout
        </Button>
      ) : (
        <Button variant='contained' disabled sx={{ width: '50%' }}>
          Checkout
        </Button>
      )}
    </Box>
  );
};

export default Checkout;
