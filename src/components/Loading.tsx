import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        justifyContent: 'center',
        height: '800px',
        width: '100vw',
        transform: 'translate(35%, 0%)',
      }}
    >
      <CircularProgress size={150} />
      <Box>
        <Typography>The backend is deployed on Render, which will go to sleep after 15 mins</Typography>
        <Typography>if it does not receive any requests. </Typography>
        <Typography>Therefore, it might requires some time for waking up the server</Typography>
      </Box>
    </Box>
  );
};

export default Loading;
