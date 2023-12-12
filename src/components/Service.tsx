import { Box, Typography } from '@mui/material';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';

const Service = () => {
  const aboutList = [
    {
      name: 'Quick Delivery',
      element: <WatchLaterRoundedIcon color='primary' sx={{ fontSize: '80px', marginX: 'auto' }} />,
    },
    {
      name: 'Secure Payment',
      element: <CreditScoreIcon color='primary' sx={{ fontSize: '80px', marginX: 'auto' }} />,
    },
    {
      name: 'Best Quality',
      element: <EmojiEventsIcon color='primary' sx={{ fontSize: '80px', marginX: 'auto' }} />,
    },
    {
      name: 'Return Guarantee',
      element: <SecurityIcon color='primary' sx={{ fontSize: '80px', marginX: 'auto' }} />,
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: '200px',
        marginTop: '50px',
        backgroundColor: '#edfff2',
        display: 'flex',
        paddingX: '10%',
        justifyContent: 'space-between',
      }}
    >
      {aboutList.map((about) => (
        <Box key={about.name} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {about.element}
          <Typography sx={{ textAlign: 'center', fontSize: '25px' }}>{about.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Service;
