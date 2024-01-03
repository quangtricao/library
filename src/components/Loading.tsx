import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '500px',
        width: '100%',
      }}
    >
      <CircularProgress size={200} />
    </Box>
  );
};

export default Loading;
