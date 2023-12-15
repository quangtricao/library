import { ChangeEvent, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addBookToReturn, clearCart, removeBookToBorrow, removeBookToReturn } from '../redux/slices/cartSlice';
import { changeBookStatusToAvailable } from '../redux/slices/booksSlice';
import { addBookToAccountSlice, removeBookFromAccountSlice } from '../redux/slices/accountSlice';
import { getBooks } from '../services/booksService';
import { borrowBooks, getProfile, returnBooks } from '../services/accountService';

import { BookType } from '../types/book';
import { clearCartFromLocalStorage, getTokenFromLocalStorage } from '../utils/localStorage';
import Checkout from '../components/Checkout';
import BookBorrowed from '../components/BookBorrowed';
import BookInCartPreviewType from '../components/BookInCartPreview';
import AccountInformation from '../components/AccountInformation';
import { setNotification } from '../redux/slices/notificationSlice';

const Account = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account.account);
  const booksToBorrow = useAppSelector((state) => state.cart.booksToBorrow);
  const booksToReturn = useAppSelector((state) => state.cart.booksToReturn);
  const token = getTokenFromLocalStorage();

  useEffect(() => {
    if (token && !account) {
      dispatch(getProfile(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReturnBook = (_event: ChangeEvent<unknown>, book: BookType) => {
    dispatch(removeBookFromAccountSlice(book._id));
    dispatch(addBookToReturn(book));
    dispatch(setNotification({ message: `Add ${book.title} to return`, type: 'success' }));
  };

  const handleNoBorrow = (_event: ChangeEvent<unknown>, book: BookType) => {
    dispatch(changeBookStatusToAvailable(book._id));
    dispatch(removeBookToBorrow(book._id));
    dispatch(setNotification({ message: `Remove ${book.title} from borrow`, type: 'success' }));
  };

  const handleNoReturn = (_event: ChangeEvent<unknown>, book: BookType) => {
    dispatch(addBookToAccountSlice(book));
    dispatch(removeBookToReturn(book._id));
    dispatch(setNotification({ message: `Remove ${book.title} from return`, type: 'success' }));
  };

  const handleCheckout = async () => {
    const booksToBorrowIdList = booksToBorrow.map((book) => book._id);
    const booksToReturnIdList = booksToReturn.map((book) => book._id);

    if (!account?._id || !token) {
      console.log('Error');
      return;
    }

    await dispatch(
      borrowBooks({
        accountId: account._id,
        token,
        booksId: booksToBorrowIdList,
      })
    );
    await dispatch(
      returnBooks({
        accountId: account._id,
        token,
        booksId: booksToReturnIdList,
      })
    );
    await dispatch(getProfile(token));
    await dispatch(getBooks({ pagination: { limit: 8 } }));
    clearCartFromLocalStorage();
    dispatch(clearCart());
    dispatch(setNotification({ message: 'Your order is success', type: 'success' }));
  };

  if (!account) {
    return <Navigate to='/account/login' />;
  }

  return (
    <Box
      sx={{
        maxWidth: '80%',
        marginX: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      <AccountInformation account={account} />
      <BookBorrowed account={account} handleReturnBook={handleReturnBook} />
      <Box>
        <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>Book in Cart</Typography>
        <BookInCartPreviewType
          status='BooksToBorrow'
          booksInCart={booksToBorrow}
          handleNoBorrow={handleNoBorrow}
          handleNoReturn={handleNoReturn}
        />
        <BookInCartPreviewType
          status='BooksToReturn'
          booksInCart={booksToReturn}
          handleNoBorrow={handleNoBorrow}
          handleNoReturn={handleNoReturn}
        />
      </Box>
      <Checkout booksToBorrow={booksToBorrow} booksToReturn={booksToReturn} handleCheckout={handleCheckout} />
    </Box>
  );
};

export default Account;
