import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getSingleBook } from '../services/booksService';

import { BookType } from '../types/book';
import { getBorrowBookInCartFromLocalStorage } from '../utils/localStorage';
import { changeBookStatusToBorrowed } from '../redux/slices/booksSlice';
import { addBookToBorrow } from '../redux/slices/cartSlice';

const Book = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account.account);
  const booksToBorrowInCart = getBorrowBookInCartFromLocalStorage();
  const { isbn } = useParams();
  const [book, setBook] = useState<BookType | null>(null);
  const [refetch, setRefetch] = useState<boolean>(true);

  useEffect(() => {
    if (isbn) {
      dispatch(getSingleBook(isbn))
        .unwrap()
        .then((response) => {
          setBook(response.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isbn, refetch]);

  const handleAddBookToCart = (_event: ChangeEvent<unknown>, book: BookType) => {
    dispatch(changeBookStatusToBorrowed(book._id));
    dispatch(addBookToBorrow(book));
    setRefetch(!refetch);
  };

  if (!book) {
    return null;
  }

  return (
    <Box
      sx={{
        maxWidth: '65%',
        height: '500px',
        marginX: 'auto',
        marginY: '100px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            {book.genres.map((genres) => {
              return (
                <Button disabled variant='contained' key={genres._id} size='small'>
                  {genres.title}
                </Button>
              );
            })}
          </Box>
          <Typography variant='h1' sx={{ fontSize: '30px', marginTop: '10px' }}>
            {book.title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              minHeight: '250px',
              display: 'flex',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'primary.dark',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '15px',
                color: 'white',
                borderRadius: '10px',
                fontWeight: 'bold',
              }}
            >
              <Box>Author</Box>
              <Box>ISBN</Box>
              <Box>Publisher</Box>
              <Box>Year Published</Box>
              <Box>Date borrowed</Box>
              <Box>Date returned</Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingLeft: '20px',
                paddingY: '15px',
              }}
            >
              <Box>
                {book.authors.length !== 0 ? (
                  book.authors.map((author) => <Typography key={author._id}>{author.name}</Typography>)
                ) : (
                  <Typography>No Authors</Typography>
                )}
              </Box>
              <Box>{book.isbn}</Box>
              <Box>{book.publisher}</Box>
              <Box>{book.publishedYear}</Box>
              <Box>{book.borrowDate ? book.borrowDate : <Box>No data</Box>}</Box>
              <Box>{book.returnDate ? book.returnDate : <Box>No data</Box>}</Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button
            variant='contained'
            disabled={
              booksToBorrowInCart.map((book) => book._id).includes(book._id) || book.status === 'borrowed'
                ? true
                : false
            }
            onClick={(event) => handleAddBookToCart(event, book)}
          >
            {booksToBorrowInCart.map((book) => book._id).includes(book._id) || book.status === 'borrowed'
              ? 'Borrowed'
              : 'Borrow'}
          </Button>
          <Button variant='contained' color='warning' disabled={account?.role === 'ADMIN' ? false : true}>
            Edit
          </Button>
          <Button variant='contained' color='error' disabled={account?.role === 'ADMIN' ? false : true}>
            Delete
          </Button>
        </Box>
      </Box>
      <img
        src={book.image}
        alt={`This is the book ${book.title}`}
        style={{ height: '100%', borderRadius: '40px', objectFit: 'cover' }}
      />
    </Box>
  );
};

export default Book;
