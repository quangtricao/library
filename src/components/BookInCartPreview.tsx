import { ChangeEvent, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import { AppContext } from '../App';
import { BookType } from '../types/book';
import { Link } from 'react-router-dom';

type BookInCartPreviewType = {
  status: 'borrow' | 'return';
  booksInCart: BookType[];
  handleCancel: (_event: ChangeEvent<unknown>, book: BookType) => void;
};

const BookInCartPreview = ({ status, booksInCart, handleCancel }: BookInCartPreviewType) => {
  const { theme } = useContext(AppContext);

  return (
    <Box>
      <Typography sx={{ fontSize: '15px', my: 1 }}>Books to {status === 'borrow' ? 'borrow' : 'return'}:</Typography>
      {booksInCart.map((book) => (
        <Box
          key={book._id}
          sx={{
            display: 'flex',
            my: '20px',
            gap: '25px',
            backgroundColor: `${theme ? '#eeeeee' : '#424242'}`,
            padding: '12px',
            borderRadius: '20px',
          }}
        >
          <img src={book.image} alt={book.title} style={{ height: '100px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to={`/books/${book.isbn}`} style={{ textDecoration: 'none', color: `${theme ? 'black' : 'white'}` }}>
              <Typography sx={{ fontSize: '18px' }}> {book.title}</Typography>
            </Link>
            <Button
              variant='contained'
              size='small'
              color='error'
              startIcon={<PlaylistRemoveIcon />}
              sx={{ width: 'fit-content' }}
              onClick={(event) => handleCancel(event, book)}
            >
              Remove
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BookInCartPreview;
