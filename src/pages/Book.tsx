import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addBookToBorrow } from '../redux/slices/cartSlice';
import { setNotification } from '../redux/slices/notificationSlice';
import { changeBookStatusToBorrowed } from '../redux/slices/booksSlice';

import { getSingleBook } from '../services/booksService';

import { BookType } from '../types/book';
import { getBorrowBookInCartFromLocalStorage } from '../utils/localStorage';

import Loading from '../components/Loading';

const Book = () => {
  const { isbn } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const account = useAppSelector((state) => state.account.account);

  const [book, setBook] = useState<BookType | null>(null);
  const [refetch, setRefetch] = useState<boolean>(true);

  const booksToBorrowInCart = getBorrowBookInCartFromLocalStorage();

  const borrowed = book
    ? booksToBorrowInCart.map((book) => book._id).includes(book._id) || book.status === 'borrowed' || !account
    : null;

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
    dispatch(setNotification({ message: `Add ${book.title} to cart`, type: 'success' }));
    setRefetch(!refetch);
  };

  if (!book) {
    return <Loading />;
  }

  return (
    <Container maxWidth='lg' sx={{ marginTop: '30px', marginBottom: '200px' }}>
      <Button variant='text' startIcon={<KeyboardArrowLeftIcon />} onClick={() => navigate('/')}>
        Home page
      </Button>
      <Box sx={{ height: '500px', display: 'flex', gap: '45px', marginTop: '8px' }}>
        <img
          src={book.image}
          alt={`This is the book ${book.title}`}
          style={{ height: '100%', borderRadius: '40px', objectFit: 'cover' }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '20px' }}>
          <Box
            sx={{
              width: 'fit-content',
              paddingX: '6px',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: `${book.status === 'available' ? 'primary.main' : 'red'}`,
              color: `${book.status === 'available' ? 'primary.main' : 'red'}`,
              borderRadius: '15px',
              fontSize: '15px',
            }}
          >
            {book.status[0].toUpperCase()}
            {book.status.slice(1)}
          </Box>
          <Typography variant='h1' sx={{ fontSize: '30px', fontWeight: 'bold' }}>
            {book.title}
          </Typography>

          <Box>
            <Typography sx={{ fontSize: '12px' }}> Authors: </Typography>
            <Box sx={{ display: 'flex' }}>
              {book.authors.map((author, index) => (
                <Typography key={author._id}>
                  {index !== 0 ? ', ' : ''}
                  {author.name}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '12px' }}> Genres: </Typography>
            <Box sx={{ display: 'flex' }}>
              {book.genres.map((genres, index) => {
                return (
                  <Typography key={genres._id} sx={{ borderRadius: '12px', fontSize: '11lpx' }}>
                    {index !== 0 ? ', ' : ''}
                    {genres.title}
                  </Typography>
                );
              })}
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '12px' }}> ISBN: </Typography>
            <Typography>{book.isbn}</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: '12px' }}>Publisher:</Typography>
            <Typography>{book.publisher}</Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '12px' }}> Published Year:</Typography>
            <Typography>{book.publishedYear}</Typography>
          </Box>

          <Box sx={{ gap: '10px', display: `${account ? 'flex' : 'none'}` }}>
            <Button
              variant='contained'
              disabled={borrowed ? true : false}
              onClick={(event) => handleAddBookToCart(event, book)}
              startIcon={borrowed ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
            >
              {borrowed ? 'Borrowed' : 'Borrow'}
            </Button>

            <Button
              variant='text'
              color='warning'
              disabled={account?.role === 'ADMIN' ? false : true}
              startIcon={<EditIcon />}
            >
              <Link to={`/books/${book.isbn}/edit`} style={{ textDecoration: 'none', color: 'inherit' }}>
                Edit Book
              </Link>
            </Button>
            <Button
              variant='text'
              color='error'
              disabled={account?.role === 'ADMIN' ? false : true}
              startIcon={<DeleteIcon />}
            >
              Delete Book
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Book;
