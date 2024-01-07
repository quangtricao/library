import { useContext } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { BookType } from '../types/book';
import { Link } from 'react-router-dom';

import { AppContext } from '../App';

import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addBookToBorrow } from '../redux/slices/cartSlice';
import { changeBookStatusToBorrowed } from '../redux/slices/booksSlice';
import { getBorrowBookInCartFromLocalStorage } from '../utils/localStorage';
import { setNotification } from '../redux/slices/notificationSlice';

type BookPreviewType = {
  book: BookType;
  imgHeight?: string;
};

const BookPreview = ({ book }: BookPreviewType) => {
  const { theme } = useContext(AppContext);
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account.account);

  // Check both in localStorage and in Database
  const booksToBorrowInCart = getBorrowBookInCartFromLocalStorage();
  const borrowed = booksToBorrowInCart.map((book) => book._id).includes(book._id) || book.status === 'borrowed';
  const bookStatus = borrowed ? 'Borrowed' : 'Available';

  const handleAddBookToCart = (_event: ChangeEvent<unknown>, book: BookType) => {
    dispatch(changeBookStatusToBorrowed(book._id));
    dispatch(addBookToBorrow(book));
    dispatch(setNotification({ message: `Add ${book.title} to cart`, type: 'success' }));
  };

  return (
    <Card
      sx={{
        backgroundColor: `${theme ? 'rgb(238, 238, 238)' : 'rgb(66, 66, 66)'}`,
        borderRadius: '15px',
        '&:hover': {
          transition: '0.5s',
          transform: 'scale(0.9)',
        },
      }}
    >
      <CardContent>
        <Link to={`/books/${book.isbn}`} style={{ textDecoration: 'none' }}>
          <Box>
            <Box>
              <img
                src={book.image}
                alt={`Book ${book.title}`}
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
            </Box>
            <Box
              sx={{
                width: 'fit-content',
                paddingX: '6px',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: `${borrowed ? 'red' : 'primary.main'}`,
                color: `${borrowed ? 'red' : 'primary.main'}`,
                borderRadius: '15px',
                fontSize: '12px',
              }}
            >
              {bookStatus}
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '16px',
                color: `${theme ? 'black' : 'white'}`,
              }}
            >
              {book.title}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {book.authors.map((author, index) => (
                <Typography sx={{ color: `${theme ? 'black' : 'white'}`, fontSize: '12px' }} key={author._id}>
                  {index === 0 ? '' : ', '}
                  {author.name}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            {book.genres.map((genre, index) => (
              <Typography sx={{ color: `${theme ? 'black' : 'white'}`, fontSize: '12px' }} key={genre._id}>
                {index === 0 ? '' : ', '}
                {genre.title}
              </Typography>
            ))}
          </Box>
        </Link>

        {account ? (
          <Button
            variant='contained'
            fullWidth
            size='small'
            onClick={(event) => handleAddBookToCart(event, book)}
            sx={{ display: `${borrowed ? 'none' : ''}` }}
          >
            Borrow
          </Button>
        ) : (
          <Button variant='contained' size='small' disabled fullWidth>
            Login to borrow
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BookPreview;
