import { Box, Typography } from '@mui/material';

import LibraryImage from '../assets/images/library.jpg';

const Introduction = () => {
  return (
    <Box sx={{ height: '550px', width: '100%', textAlign: 'center' }}>
      <img
        src={LibraryImage}
        alt='welcome part'
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.3' }}
      />
      <Box sx={{ width: '40%', marginX: 'auto', transform: 'translate(0, -400px)' }}>
        <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>Welcome to the Library</Typography>
        <Typography sx={{ fontSize: '20px' }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum perferendis aperiam sed saepe odit alias
          delectus illo! Ea magni odio veritatis, cupiditate, aliquid cumque facere adipisci culpa inventore
          voluptatibus pariatur!
        </Typography>
      </Box>
    </Box>
  );
};

export default Introduction;
