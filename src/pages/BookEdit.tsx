import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { getSingleBook, updateSingleBook } from '../services/booksService';
import Loading from '../components/Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { BookDTO } from '../types/book';
import { getTokenFromLocalStorage } from '../utils/localStorage';
import { setNotification } from '../redux/slices/notificationSlice';

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
    <Box sx={{ maxWidth: '50%', marginX: 'auto', marginY: '100px', minHeight: '600px' }}>
      <Link to={`/books/${isbn}`} style={{ textDecoration: 'none' }}>
        <Button startIcon={<ArrowLeftIcon />} variant='text' sx={{ marginY: '30px', color: 'primary.main' }}>
          Back to the book
        </Button>
      </Link>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box>
          <Typography
            sx={{
              fontWeight: 'bold',
              borderTop: '0px',
              borderRight: '0px',
              borderLeft: '0px',
              borderBottom: '4px',
              borderStyle: 'solid',
              borderColor: 'primary.light',
              width: 'fit-content',
            }}
          >
            Basic details
          </Typography>
          <Box sx={{ display: 'flex', gap: '30px' }}>
            <TextField
              label='ISBN'
              variant='standard'
              value={updateBook.isbn}
              sx={{ width: '20%' }}
              onChange={(event) => setUpdateBook({ ...updateBook, isbn: event.target.value })}
            />
            <TextField
              label='Title'
              variant='standard'
              value={updateBook.title}
              sx={{ flexGrow: 1 }}
              onChange={(event) => setUpdateBook({ ...updateBook, title: event.target.value })}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                borderTop: '0px',
                borderRight: '0px',
                borderLeft: '0px',
                borderBottom: '4px',
                borderStyle: 'solid',
                borderColor: 'primary.light',
                width: 'fit-content',
                marginRight: '15px',
              }}
            >
              Authors:
            </Typography>
            {updateBook.authors.length === 0
              ? null
              : updateBook.authors.map((author) => (
                  <Button
                    key={author._id}
                    variant='outlined'
                    endIcon={<DeleteIcon />}
                    sx={{
                      fontSize: '12px',
                      width: 'fit-content',
                      paddingX: '10px',
                      borderRadius: '20px',
                    }}
                  >
                    {author.name}
                  </Button>
                ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                borderTop: '0px',
                borderRight: '0px',
                borderLeft: '0px',
                borderBottom: '4px',
                borderStyle: 'solid',
                borderColor: 'primary.light',
                width: 'fit-content',
                marginRight: '15px',
              }}
            >
              Genres:
            </Typography>
            {updateBook.genres.length === 0
              ? null
              : updateBook.genres.map((genre) => (
                  <Button
                    key={genre._id}
                    variant='outlined'
                    endIcon={<DeleteIcon />}
                    sx={{
                      fontSize: '12px',
                      width: 'fit-content',
                      paddingX: '10px',
                      borderRadius: '20px',
                    }}
                  >
                    {genre.title}
                  </Button>
                ))}
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 'bold',
              borderTop: '0px',
              borderRight: '0px',
              borderLeft: '0px',
              borderBottom: '4px',
              borderStyle: 'solid',
              borderColor: 'primary.light',
              width: 'fit-content',
              marginRight: '15px',
            }}
          >
            Publish details:
          </Typography>
          <Box sx={{ display: 'flex', gap: '30px' }}>
            <TextField
              label='Publisher'
              value={updateBook.publisher}
              variant='standard'
              sx={{ flexGrow: '1' }}
              onChange={(event) => setUpdateBook({ ...updateBook, publisher: event.target.value })}
            />
            <TextField
              label='Year Published'
              value={updateBook.publishedYear}
              variant='standard'
              sx={{ width: '30%' }}
              onChange={(event) => setUpdateBook({ ...updateBook, publishedYear: Number(event.target.value) })}
            />
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 'bold',
              borderTop: '0px',
              borderRight: '0px',
              borderLeft: '0px',
              borderBottom: '4px',
              borderStyle: 'solid',
              borderColor: 'primary.light',
              width: 'fit-content',
              marginRight: '15px',
            }}
          >
            Image links:
          </Typography>
          <TextField
            label='Images'
            variant='standard'
            onChange={(event) => setUpdateBook({ ...updateBook, image: event.target.value })}
          />
          <img
            src={updateBook.image}
            alt={`${updateBook.title}`}
            style={{ height: '150px', width: '150px', objectFit: 'contain' }}
          />
        </Box>
        <Button size='large' variant='contained' onClick={handleConfirmUpdate}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};
export default EditModal;
