import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getSingleBook } from '../services/booksService';
import { BookType } from '../types/book';

const Book = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account.account);
  const { isbn } = useParams();
  const [book, setBook] = useState<BookType | null>(null);

  useEffect(() => {
    if (isbn) {
      try {
        dispatch(getSingleBook(isbn))
          .unwrap()
          .then((response) => {
            setBook(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!book) {
    return null;
  }

  return (
    <Box
      sx={{
        maxWidth: '85%',
        marginX: 'auto',
        marginY: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
      }}
    >
      <Box
        sx={{
          marginX: '5%',
          height: '650px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '30px',
          }}
        >
          <Box sx={{ display: 'flex', gap: '10px' }}>
            {book.genres.length !== 0 ? (
              book.genres.map((genres) => {
                return (
                  <Button disabled variant='contained' key={genres._id}>
                    {genres.title}
                  </Button>
                );
              })
            ) : (
              <Button disabled variant='contained'>
                No Genres
              </Button>
            )}
          </Box>

          <Typography variant='h1' sx={{ fontSize: '30px' }}>
            {book.title}
          </Typography>
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
                    book.authors.map((author) => (
                      <Typography key={author._id}>{author.name}</Typography>
                    ))
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {book.status === 'available' ? (
              <Button variant='contained'>Borrow</Button>
            ) : (
              <Button variant='contained' disabled>
                Not in Library
              </Button>
            )}

            {account?.role === 'ADMIN' ? (
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <Button variant='contained' color='warning'>
                  Edit
                </Button>
                <Button variant='contained' color='error'>
                  Delete
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <Button variant='contained' color='warning' disabled>
                  Edit
                </Button>
                <Button variant='contained' color='error' disabled>
                  Delete
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        <img
          src={book.image}
          alt={`This is the book ${book.title}`}
          style={{ height: '100%', borderRadius: '40px', objectFit: 'cover' }}
        />
      </Box>

      <Box>
        <Typography variant='h2' sx={{ fontSize: '20px', marginY: '20px' }}>
          Related books
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ minHeight: '250px', width: '15%', backgroundColor: 'primary.light' }}></Box>
          <Box sx={{ minHeight: '250px', width: '15%', backgroundColor: 'primary.light' }}></Box>
          <Box sx={{ minHeight: '250px', width: '15%', backgroundColor: 'primary.light' }}></Box>
          <Box sx={{ minHeight: '250px', width: '15%', backgroundColor: 'primary.light' }}></Box>
          <Box sx={{ minHeight: '250px', width: '15%', backgroundColor: 'primary.light' }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Book;
