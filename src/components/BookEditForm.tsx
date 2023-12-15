import { Dispatch, SetStateAction } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { BookDTO } from '../types/book';

type BookEditFormType = {
  updateBook: BookDTO;
  setUpdateBook: Dispatch<SetStateAction<BookDTO>>;
  handleConfirmUpdate: () => void;
};

const BookEditForm = ({ updateBook, setUpdateBook, handleConfirmUpdate }: BookEditFormType) => {
  return (
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
  );
};
export default BookEditForm;
