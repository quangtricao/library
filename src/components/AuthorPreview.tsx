import { ChangeEvent, useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { AppContext } from '../App';
import { AuthorType } from '../types/author';

type Props = {
  author: AuthorType;
  handleBooksAuthorsFetch: (_event: ChangeEvent<unknown>, authorId: string) => Promise<void>;
};

const AuthorPreview = ({ author, handleBooksAuthorsFetch }: Props) => {
  const { theme } = useContext(AppContext);

  return (
    <Box
      sx={{
        backgroundColor: `${theme ? '#eeeeee' : '#b0a9a9'}`,
        borderRadius: '10px',
        px: '12px',
        py: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        '&:hover': {
          transition: '0.3s',
          transform: 'scale(0.95)',
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Box>
          <img
            src={author.image}
            alt={`Author ${author.name}`}
            style={{
              height: '100px',
              width: '100px',
              objectFit: 'cover',
              borderRadius: '100px',
              filter: 'grayscale(100%)',
            }}
          />
        </Box>

        <Typography sx={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}>
          {author.bio.slice(0, 60)} ...
        </Typography>
      </Box>
      <Button
        variant='text'
        fullWidth
        size='small'
        sx={{ color: `${theme ? 'black' : 'white'}` }}
        onClick={(event) => handleBooksAuthorsFetch(event, author._id)}
      >
        {author.name}
      </Button>
    </Box>
  );
};

export default AuthorPreview;
