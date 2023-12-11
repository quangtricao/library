import { Box, Button } from '@mui/material';
import { BookType } from '../types/book';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { addBookToBorrow } from '../redux/slices/cartSlice';
import { changeBookStatusToBorrowed } from '../redux/slices/booksSlice';

type BookPreviewButtonType = {
  book: BookType;
  isLogin: boolean;
};

const BookPreviewButton = ({ book, isLogin }: BookPreviewButtonType) => {
  // book.borrowerId === user._id
  const dispatch = useAppDispatch();

  const handleAddBookToReturnCart = (_event: ChangeEvent<unknown>, book: BookType) => {
    dispatch(changeBookStatusToBorrowed(book._id));
    dispatch(addBookToBorrow(book));
  };

  return (
    <Box>
      {isLogin ? (
        <>
          {book.status === 'available' ? (
            <Button
              variant='contained'
              fullWidth
              onClick={(event) => handleAddBookToReturnCart(event, book)}
            >
              Borrow
            </Button>
          ) : (
            <Button variant='contained' disabled fullWidth>
              Borrowed
            </Button>
          )}
        </>
      ) : (
        <Button variant='contained' disabled fullWidth>
          Login to borrow
        </Button>
      )}
    </Box>
  );
};

export default BookPreviewButton;
