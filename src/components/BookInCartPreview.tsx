import { ChangeEvent } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';

import BookPreview from './BookPreview';
import { BookType } from '../types/book';

type BookInCartPreviewType = {
  status: 'BooksToBorrow' | 'BooksToReturn';
  booksInCart: BookType[];
  handleNoBorrow: (_event: ChangeEvent<unknown>, book: BookType) => void;
  handleNoReturn: (_event: ChangeEvent<unknown>, book: BookType) => void;
};

const BookInCartPreview = ({
  status,
  booksInCart,
  handleNoBorrow,
  handleNoReturn,
}: BookInCartPreviewType) => {
  return (
    <Box sx={{ minHeight: '250px' }}>
      <Typography sx={{ fontWeight: 'bold' }}>
        {status === 'BooksToBorrow' ? 'Books to borrow' : null}
        {status === 'BooksToReturn' ? 'Books to return' : null}
      </Typography>

      {booksInCart.length === 0 ? (
        <Box>You have no books in cart.</Box>
      ) : (
        <Box>
          <Grid container columns={5}>
            {booksInCart.map((book) => (
              <Grid key={book._id} item xs={1} sx={{ padding: '10px' }}>
                <BookPreview book={book} imgHeight='350px' />

                {status === 'BooksToBorrow' ? (
                  <Button
                    variant='contained'
                    color='error'
                    fullWidth
                    onClick={(event) => handleNoBorrow(event, book)}
                  >
                    No, I don't want to borrow it now
                  </Button>
                ) : null}
                {status === 'BooksToReturn' ? (
                  <Button
                    variant='contained'
                    color='error'
                    fullWidth
                    onClick={(event) => handleNoReturn(event, book)}
                  >
                    No, I don't want to return it now
                  </Button>
                ) : null}
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default BookInCartPreview;
