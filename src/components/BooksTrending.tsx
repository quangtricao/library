import { Box, Typography } from '@mui/material';
import { BookType } from '../types/book';
import BookPreview from './BookPreview';

type BooksTrendingType = {
  books: BookType[];
};

const BooksTrending = ({ books }: BooksTrendingType) => {
  const selectBooks = books.slice(1, 7);

  return (
    <Box sx={{ maxWidth: '80%', marginX: 'auto', marginTop: '30px' }}>
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Typography sx={{ color: 'primary.main', fontSize: '30px', fontWeight: 'bold' }}>Trending</Typography>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>books</Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridGap: '10px',
          height: 'fit-content',
          marginTop: '20px',
        }}
      >
        <Box sx={{ height: '100%', gridArea: '1 / 1 / 3 /3' }}>
          <BookPreview book={books[0]} imgHeight='770px' />
        </Box>
        {selectBooks.map((book) => (
          <Box key={book._id}>
            <BookPreview book={book} imgHeight='350px' />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BooksTrending;
