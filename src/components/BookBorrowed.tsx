import { ChangeEvent, useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import { AppContext } from '../App';
import { BookType } from '../types/book';
import { AccountType } from '../types/account';
import { Link } from 'react-router-dom';

type BookBorrowedType = {
  account: AccountType;
  handleReturnBook: (_event: ChangeEvent<unknown>, book: BookType) => void;
};

const BookBorrowed = ({ account, handleReturnBook }: BookBorrowedType) => {
  const { theme } = useContext(AppContext);

  return (
    <Box>
      <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>
        Your borrowed books. Remember to return them.
      </Typography>

      {account.borrowedBooks.length === 0 ? (
        <Box>Great. You have no books in loan</Box>
      ) : (
        <Box>
          {account.borrowedBooks.map((book) => (
            <Box
              key={book._id}
              sx={{
                display: 'flex',
                gap: '25px',
                py: '20px',
                paddingLeft: '5%',
                my: '20px',
                backgroundColor: `${theme ? 'primary.light' : 'primary.main'}`,
                borderRadius: '20px',
              }}
            >
              <img src={book.image} alt={book.title} style={{ height: '100px' }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to={`/books/${book.isbn}`} style={{ textDecoration: 'none' }}>
                  <Typography sx={{ fontSize: '18px' }}> {book.title}</Typography>
                </Link>
                <Button
                  variant='contained'
                  size='small'
                  color='warning'
                  sx={{ width: 'fit-content' }}
                  startIcon={<PlaylistRemoveIcon />}
                  onClick={(event) => handleReturnBook(event, book)}
                >
                  Return
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BookBorrowed;
