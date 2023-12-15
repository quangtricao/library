import { Box, Button } from '@mui/material';
import { BookType } from '../types/book';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { addBookToBorrow } from '../redux/slices/cartSlice';
import { changeBookStatusToBorrowed } from '../redux/slices/booksSlice';
import { getBorrowBookInCartFromLocalStorage } from '../utils/localStorage';
import { setNotification } from '../redux/slices/notificationSlice';

type BookPreviewButtonType = {
  book: BookType;
  isLogin: boolean;
};

const BookPreviewButton = ({ book, isLogin }: BookPreviewButtonType) => {
  const dispatch = useAppDispatch();
  const booksToBorrowInCart = getBorrowBookInCartFromLocalStorage();
  const borrowed = booksToBorrowInCart.map((book) => book._id).includes(book._id) || book.status === 'borrowed';

  const handleAddBookToCart = (_event: ChangeEvent<unknown>, book: BookType) => {
    dispatch(changeBookStatusToBorrowed(book._id));
    dispatch(addBookToBorrow(book));
    dispatch(setNotification({ message: `Add ${book.title} to cart`, type: 'success' }));
  };

  return (
    <Box>
      {isLogin ? (
        <Button
          variant='contained'
          disabled={borrowed ? true : false}
          fullWidth
          onClick={(event) => handleAddBookToCart(event, book)}
        >
          {borrowed ? 'Borrowed' : 'Borrow'}
        </Button>
      ) : (
        <Button variant='contained' disabled fullWidth>
          Login to borrow
        </Button>
      )}
    </Box>
  );
};

export default BookPreviewButton;
