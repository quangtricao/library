import { Box } from '@mui/material';
import { BookType } from '../types/book';
import { Link } from 'react-router-dom';

type BookPreviewType = {
  book: BookType;
  imgHeight: string;
};

const BookPreview = ({ book, imgHeight }: BookPreviewType) => {
  return (
    <Box>
      <Link to={`/books/${book.isbn}`}>
        <img
          src={book.image}
          alt={`Book ${book.title}`}
          style={{
            width: '100%',
            height: `${imgHeight}`,
            objectFit: 'cover',
          }}
        />
      </Link>
      <Link to={`/books/${book.isbn}`} style={{ textDecoration: 'none' }}>
        <Box sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {book.title.length < 30 ? book.title : book.title.slice(0, 30) + '...'}
        </Box>
      </Link>
    </Box>
  );
};

export default BookPreview;
