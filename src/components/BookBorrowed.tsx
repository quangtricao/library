import { ChangeEvent } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import { BookType } from '../types/book';
import { AccountType } from '../types/account';
import BookPreview from './BookPreview';

type BookBorrowedType = {
  account: AccountType;
  handleReturnBook: (_event: ChangeEvent<unknown>, book: BookType) => void;
};

const BookBorrowed = ({ account, handleReturnBook }: BookBorrowedType) => {
  return (
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
                <BookPreview book={book} imgHeight='350px' />
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
  );
};

export default BookBorrowed;
