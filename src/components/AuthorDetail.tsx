import { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { AuthorType } from '../types/author';

import { AppContext } from '../App';

type Props = {
  singleAuthor: AuthorType;
};

const AuthorDetail = ({ singleAuthor }: Props) => {
  const { theme } = useContext(AppContext);

  return (
    <Box
      sx={{
        backgroundColor: `${theme ? 'primary.light' : 'primary.main'}`,
        my: '30px',
        p: '10px',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '30px',
        borderRadius: '20px',
      }}
    >
      <Box sx={{ width: { xs: '100%', sm: '40%' }, height: { xs: '400px', sm: '300px' } }}>
        <img
          src={singleAuthor.image}
          alt={`${singleAuthor.name} author`}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%)',
            borderRadius: '20px',
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', color: 'white' }}>
        <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>{singleAuthor.name}</Typography>
        <Typography> {singleAuthor.bio}</Typography>
        <Typography sx={{ marginTop: '20px' }}>Below are some featured books of the author.</Typography>
      </Box>
    </Box>
  );
};

export default AuthorDetail;
