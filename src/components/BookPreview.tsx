import { useContext } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { BookType } from '../types/book';
import { Link } from 'react-router-dom';

import { AppContext } from '../App';

type BookPreviewType = {
  book: BookType;
  imgHeight?: string;
};

const BookPreview = ({ book }: BookPreviewType) => {
  const { theme } = useContext(AppContext);

  return (
    <Card sx={{ backgroundColor: `${theme ? 'rgb(238, 238, 238)' : 'rgb(66, 66, 66)'}`, borderRadius: '15px' }}>
      <Link to={`/books/${book.isbn}`} style={{ textDecoration: 'none' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
            <Box
              sx={{
                width: 'fit-content',
                paddingX: '6px',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: `${book.status === 'available' ? 'primary.main' : 'red'}`,
                color: `${book.status === 'available' ? 'primary.main' : 'red'}`,
                borderRadius: '15px',
                fontSize: '12px',
              }}
            >
              {book.status}
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
        </CardContent>
      </Link>
    </Card>
  );
};

export default BookPreview;
