import { Box } from '@mui/material';

import LibraryImage from '../assets/images/library.jpg';

const Introduction = () => {
  return (
    <Box
      sx={{
        height: '500px',
        width: '100%',
        backgroundImage: `url(${LibraryImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* <Typography>Welcome to the Library</Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, deserunt. Iure deleniti
          eligendi perferendis, quos voluptatem corrupti, eius itaque veritatis, unde quo aperiam
          blanditiis. Qui possimus earum iste alias labore?
        </Typography> */}
    </Box>
  );
};

export default Introduction;
