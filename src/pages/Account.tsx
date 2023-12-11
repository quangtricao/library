import { Box, Button, Grid, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import BookPreview from '../components/BookPreview';
import { ChangeEvent, useEffect } from 'react';
import { addBookToAccountSlice, removeBookFromAccountSlice } from '../redux/slices/accountSlice';
import { borrowBooks, getProfile, returnBooks } from '../services/accountService';
import { getTokenFromLocalStorage } from '../utils/localStorage';
import { BookType } from '../types/book';
import {
  addBookToReturn,
  clearCart,
  removeBookToBorrow,
  removeBookToReturn,
} from '../redux/slices/cartSlice';
import { changeBookStatusToAvailable } from '../redux/slices/booksSlice';

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
  };

  const handleNoBorrow = (_event: ChangeEvent<unknown>, book: BookType) => {
    dispatch(changeBookStatusToAvailable(book._id));
    dispatch(removeBookToBorrow(book._id));
  };

  const handleNoReturn = (_event: ChangeEvent<unknown>, book: BookType) => {
    dispatch(addBookToAccountSlice(book));
    dispatch(removeBookToReturn(book._id));
  };

  const handleCheckout = async () => {
    const booksToBorrowIdList = booksToBorrow.map((book) => book._id);
    const booksToReturnIdList = booksToReturn.map((book) => book._id);

    if (!account?._id || !token) {
      console.log('Error');
      return;
    }

    await dispatch(borrowBooks({ accountId: account._id, token, booksId: booksToBorrowIdList }));
    await dispatch(returnBooks({ accountId: account._id, token, booksId: booksToReturnIdList }));
    await dispatch(getProfile(token));
    dispatch(clearCart());
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
        gap: '30px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
        <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>
          Your borrowed books. Remember to return them.
        </Typography>

        {account.borrowedBooks.length === 0 ? (
          <Box>Great. You have no books in loan</Box>
        ) : (
          <Box>
            <Grid container columns={5}>
              {account.borrowedBooks.map((book) => (
                <Grid key={book._id} item xs={1} sx={{ padding: '10px' }}>
                  <BookPreview book={book} imgHeight='250px' />
                  <Button
                    variant='contained'
                    color='warning'
                    fullWidth
                    onClick={(event) => handleReturnBook(event, book)}
                  >
                    Return Book
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      <Box>
        <Box>
          <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}> Book in Cart</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}> Books to borrow</Typography>

          {booksToBorrow.length === 0 ? (
            <Box>You have no books to borrow in cart.</Box>
          ) : (
            <Box>
              <Grid container columns={5}>
                {booksToBorrow.map((book) => (
                  <Grid key={book._id} item xs={1} sx={{ padding: '10px' }}>
                    <BookPreview book={book} imgHeight='250px' />
                    <Button
                      variant='contained'
                      color='error'
                      fullWidth
                      onClick={(event) => handleNoBorrow(event, book)}
                    >
                      No, I don't want to borrow it now
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>Books to Return</Typography>

          {booksToReturn.length === 0 ? (
            <Box>You have no books to return in cart.</Box>
          ) : (
            <Box>
              <Grid container columns={5}>
                {booksToReturn.map((book) => (
                  <Grid key={book._id} item xs={1} sx={{ padding: '10px' }}>
                    <BookPreview book={book} imgHeight='250px' />
                    <Button
                      variant='contained'
                      color='error'
                      fullWidth
                      onClick={(event) => handleNoReturn(event, book)}
                    >
                      No, I don't want to return it now
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>

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
      </Box>
    </Box>
  );
};

export default Account;
