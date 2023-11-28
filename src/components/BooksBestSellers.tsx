import { Box, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const items = [
  {
    id: 1,
    name: 'Random Name #0',
    description: 'Probably the most random thing you have ever seen!',
  },
  {
    id: 2,
    name: 'Random Name #1',
    description: 'Hello World!',
  },
  {
    id: 3,
    name: 'Random Name #2',
    description: 'Hello World!',
  },
];

const BestSellersBooks = () => {
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: '80%',
          marginX: 'auto',
          marginTop: '50px',
          marginBottom: '20px',
        }}
      >
        Best Sellers Books
      </Box>
      <Carousel
        NextIcon={<NavigateNextIcon />}
        PrevIcon={<NavigateBeforeIcon />}
        fullHeightHover
        cycleNavigation
        navButtonsAlwaysVisible
        swipe
        indicators={false}
        animation='slide'
        duration={1000}
        index={1}
        autoPlay={false}
        sx={{ minWidth: '450px', backgroundColor: 'red' }}
        onChange={(now, prev) => console.log(now, prev)}
      >
        {items.map((item) => {
          return (
            <Box key={item.id}>
              <Box sx={{ height: '200px', backgroundColor: 'red' }}>
                <Typography>{item.name}</Typography>
                <Typography>{item.description}</Typography>
              </Box>
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default BestSellersBooks;
