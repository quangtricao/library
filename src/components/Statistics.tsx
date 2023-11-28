import { Box, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Statistics = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '250px',
        backgroundColor: '#058036',
        display: 'flex',
        paddingX: '300px',
        justifyContent: 'space-between',
        color: 'white',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex' }}>
          <StoreIcon sx={{ fontSize: '80px', marginX: 'auto' }} />
          <Typography sx={{ textAlign: 'center', fontSize: '25px' }}>268</Typography>
        </Box>

        <Typography sx={{ textAlign: 'center', fontSize: '25px', minWidth: '200px' }}>
          Our stores around the world
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <GroupsIcon sx={{ fontSize: '80px', marginX: 'auto' }} />
          <Typography sx={{ textAlign: 'center', fontSize: '25px' }}>696,969</Typography>
        </Box>

        <Typography sx={{ textAlign: 'center', fontSize: '25px', minWidth: '200px' }}>
          Our happy customers
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <LibraryBooksIcon sx={{ fontSize: '80px', marginX: 'auto' }} />
          <Typography sx={{ textAlign: 'center', fontSize: '25px' }}>69+k</Typography>
        </Box>

        <Typography sx={{ textAlign: 'center', fontSize: '25px', minWidth: '200px' }}>
          Book Collections
        </Typography>
      </Box>
    </Box>
  );
}

export default Statistics;