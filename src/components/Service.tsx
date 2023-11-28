import { Box, Typography } from '@mui/material';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';

const Service = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '250px',
        marginTop: '50px',
        backgroundColor: '#edfff2',
        display: 'flex',
        paddingX: '80px',
        justifyContent: 'space-between',
        gap: '30px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <WatchLaterRoundedIcon color='primary' sx={{ fontSize: '80px', marginX: 'auto' }} />
        <Typography sx={{ textAlign: 'center', fontSize: '25px' }}>Quick Delivery</Typography>
        <Typography sx={{ textAlign: 'center', fontSize: '15px', minWidth: '300px' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus nobis rerum
          recusandae! Velit voluptatum numquam
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CreditScoreIcon color='primary' sx={{ fontSize: '80px', marginX: 'auto' }} />
        <Typography sx={{ textAlign: 'center', fontSize: '25px' }}>Secure Payment</Typography>
        <Typography sx={{ textAlign: 'center', fontSize: '15px', minWidth: '300px' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus nobis rerum
          recusandae! Velit voluptatum numquam
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <EmojiEventsIcon color='primary' sx={{ fontSize: '80px', marginX: 'auto' }} />
        <Typography sx={{ textAlign: 'center', fontSize: '25px' }}>Best Quality</Typography>
        <Typography sx={{ textAlign: 'center', fontSize: '15px', minWidth: '300px' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatbus nobis rerum
          recusandae! Velit voluptatum numquam
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <SecurityIcon color='primary' sx={{ fontSize: '80px', marginX: 'auto' }} />
        <Typography sx={{ textAlign: 'center', fontSize: '25px' }}>Return Guarantee</Typography>
        <Typography sx={{ textAlign: 'center', fontSize: '15px', minWidth: '300px' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus nobis rerum
          recusandae! Velit voluptatum numquam
        </Typography>
      </Box>
    </Box>
  );
};

export default Service;
