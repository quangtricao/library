import { useEffect, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useAppDispatch } from '../redux/hooks';
import { getSingleBook, updateSingleBook } from '../services/booksService';
import { getTokenFromLocalStorage } from '../utils/localStorage';
import { setNotification } from '../redux/slices/notificationSlice';
import { BookDTO } from '../types/book';
import Loading from '../components/Loading';
import BookEditForm from '../components/BookEditForm';

const EditModal = () => {
  const { isbn } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = getTokenFromLocalStorage();
  const [updateBook, setUpdateBook] = useState<BookDTO>({
    isbn: '',
    title: '',
    image: '',
    publisher: '',
    publishedYear: 0,
    authors: [],
    genres: [],
    status: 'available',
  });

  useEffect(() => {
    if (isbn) {
      dispatch(getSingleBook(isbn))
        .unwrap()
        .then((response) => {
          const book = response.data;
          setUpdateBook({
            isbn: book.isbn,
            title: book.title,
            image: book.image,
            publisher: book.publisher,
            publishedYear: book.publishedYear,
            authors: book.authors,
            genres: book.genres,
            status: book.status,
          });
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isbn]);

  const handleConfirmUpdate = async () => {
    if (!token) {
      dispatch(setNotification({ message: 'You do not have the permit', type: 'error' }));
      return;
    }
    await dispatch(updateSingleBook({ token, book: updateBook }));
    dispatch(setNotification({ message: `Update book successfully`, type: 'success' }));
    navigate(`/books/${isbn}`);
  };

  if (!updateBook) {
    return <Loading />;
  }

  return (
    <Container maxWidth='lg' sx={{ marginY: '30px', minHeight: '750px' }}>
      <Box sx={{ maxWidth: '80%', marginX: 'auto' }}>
        <Button
          startIcon={<KeyboardArrowLeftIcon />}
          variant='text'
          sx={{ marginY: '30px', color: 'primary.main' }}
          onClick={() => navigate(`/books/${isbn}`)}
        >
          Back to the book
        </Button>
        <BookEditForm updateBook={updateBook} setUpdateBook={setUpdateBook} handleConfirmUpdate={handleConfirmUpdate} />
      </Box>
    </Container>
  );
};

export default EditModal;
