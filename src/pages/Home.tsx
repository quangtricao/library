import LibraryImage from '../assets/images/library.jpg';
import { Box, Typography } from '@mui/material';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';
import StoreIcon from '@mui/icons-material/Store';
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Home = () => {
  return (
    <Box>
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

      <Box sx={{ maxWidth: '80%', marginX: 'auto', marginTop: '50px' }}>
        <Typography>Trending this week</Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, deserunt. Iure deleniti
          eligendi perferendis, quos voluptatem corrupti, eius itaque veritatis, unde quo aperiam
          blanditiis. Qui possimus earum iste alias labore?
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridGap: '20px',
          height: '500px',
          maxWidth: '80%',
          marginX: 'auto',
          marginTop: '50px',
        }}
      >
        <Box sx={{ height: '100%', backgroundColor: '#edfff2', gridArea: '1 / 1 / 3 /3' }}>1</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>2</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>3</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>4</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>5</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>6</Box>
        <Box sx={{ height: '100%', backgroundColor: '#edfff2' }}>7</Box>
      </Box>

      <Box
        sx={{ width: '100%', height: '300px', maxWidth: '80%', marginX: 'auto', marginTop: '50px' }}
      >
        Featured Books
      </Box>

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

      <Box
        sx={{ width: '100%', height: '300px', maxWidth: '80%', marginX: 'auto', marginTop: '50px' }}
      >
        Best Sellers
      </Box>

      <Box sx={{ width: '100%', marginTop: '50px', backgroundColor: '#edfff2' }}>
        <Box
          sx={{
            width: '100%',
            height: '300px',
            maxWidth: '80%',
            marginX: 'auto',
            marginTop: '50px',
          }}
        >
          Latest Books
        </Box>
      </Box>

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

      <Box sx={{ width: '100%', backgroundColor: '#58db7b', color: 'white' }}>
        <Box
          sx={{
            width: '100%',
            height: '300px',
            maxWidth: '80%',
            marginX: 'auto',
          }}
        >
          Subcribe
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
