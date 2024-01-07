import { ChangeEvent, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addBookToReturn, clearCart, removeBookToBorrow, removeBookToReturn } from '../redux/slices/cartSlice';
import { changeBookStatusToAvailable } from '../redux/slices/booksSlice';
import { addBookToAccountSlice, removeBookFromAccountSlice } from '../redux/slices/accountSlice';
import { getBooks } from '../services/booksService';
import { borrowBooks, getProfile, returnBooks } from '../services/accountService';

import { BookType } from '../types/book';
import { clearCartFromLocalStorage, getTokenFromLocalStorage } from '../utils/localStorage';
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
    <Container maxWidth='lg' sx={{ my: '50px' }}>
      <AccountInformation account={account} />
      <BookBorrowed account={account} handleReturnBook={handleReturnBook} />
      <Box>
        <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>Your Cart</Typography>
        {booksToBorrow.length !== 0 || booksToReturn.length !== 0 ? (
          <>
            <Grid container columns={{ xs: 1, sm: 2 }} spacing={5}>
              <Grid item xs={1}>
                <BookInCartPreviewType status='borrow' booksInCart={booksToBorrow} handleCancel={handleNoBorrow} />
              </Grid>
              <Grid item xs={1}>
                <BookInCartPreviewType status='return' booksInCart={booksToReturn} handleCancel={handleNoReturn} />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant='contained'
                sx={{ width: '60%' }}
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ height: '300px' }}>You have no books in cart.</Box>
        )}
      </Box>
    </Container>
  );
};

export default Account;
