import { useContext } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Grid, Typography } from '@mui/material';
import happypepe from '../assets/img/happypepe.png';

import { AppContext } from '../App';

const Introduction = () => {
  const { theme } = useContext(AppContext);
  const items = [
    {
      data: [
        {
          name: 'Read Free Books (Titles) Online',
          description: 'Yes, our books have no content included.',
          image: 'https://openlibrary.org/static/images/onboarding/read.png',
        },
        {
          name: 'Set Your Yearly Reading Goal',
          description: 'I mean... you really want to read titles?',
          image: 'https://openlibrary.org/static/images/onboarding/reading_goal.svg',
        },
        {
          name: 'Keep Track of your Borrowed Books',
          description: 'Finally, a working funtionality.',
          image: 'https://openlibrary.org/static/images/onboarding/track.png',
        },
      ],
    },
    {
      data: [
        {
          name: 'Be a customer',
          description: 'Register and you will be able to borrow books.',
          image: 'https://openlibrary.org/static/images/onboarding/librarian.png',
        },
        {
          name: 'Send us feedback',
          description: 'Your feedback will help us improve.',
          image: 'https://openlibrary.org/static/images/onboarding/feedback.png',
        },
        {
          name: 'We are not a real company',
          description: 'All your data is safe since nobody will buy',
          image: happypepe,
        },
      ],
    },
  ];

  const oneItem = [
    {
      name: 'Read Free Books (Titles) Online',
      description: 'Yes, our books have no content included.',
      image: 'https://openlibrary.org/static/images/onboarding/read.png',
    },
    {
      name: 'Set Your Yearly Reading Goal',
      description: 'I mean... you really want to read titles?',
      image: 'https://openlibrary.org/static/images/onboarding/reading_goal.svg',
    },
    {
      name: 'Keep Track of your Borrowed Books',
      description: 'Finally, a working funtionality.',
      image: 'https://openlibrary.org/static/images/onboarding/track.png',
    },
    {
      name: 'Be a customer',
      description: 'Register and you will be able to borrow books.',
      image: 'https://openlibrary.org/static/images/onboarding/librarian.png',
    },
    {
      name: 'Send us feedback',
      description: 'Your feedback will help us improve.',
      image: 'https://openlibrary.org/static/images/onboarding/feedback.png',
    },
    {
      name: 'We are not a real company',
      description: 'All your data is safe since nobody will buy',
      image: happypepe,
    },
  ];

  return (
    <Box sx={{ marginTop: '30px' }}>
      <Box sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <Typography
          sx={{
            color: 'primary.main',
            fontSize: '30px',
            fontWeight: 'bold',
            borderTop: '0px',
            borderRight: '0px',
            borderLeft: '0px',
            borderBottom: '4px',
            borderStyle: 'solid',
            borderColor: 'primary.light',
          }}
        >
          Welcome
        </Typography>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>to Library</Typography>
      </Box>

      <Carousel
        indicators
        navButtonsAlwaysInvisible
        autoPlay
        animation='fade'
        stopAutoPlayOnHover
        duration={1500}
        interval={5000}
        sx={{ display: { xs: 'none', md: 'flex', flexDirection: 'column' } }}
      >
        {items.map((item, index) => (
          <Grid key={index} container columns={3} spacing={2} sx={{ minHeight: '180px' }}>
            <Grid item xs={1}>
              <Box
                sx={{
                  backgroundColor: `${theme ? '#eeeeee' : '#b0a9a9'}`,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  borderRadius: '15px',
                  marginLeft: '5px',
                  px: 3,
                }}
              >
                <img src={item.data[0].image} alt='' style={{ height: '100px' }} />
                <Box>
                  <Typography sx={{ fontSize: '20px' }}>{item.data[0].name}</Typography>
                  <Typography sx={{ fontSize: '15px' }}>{item.data[0].description}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  backgroundColor: `${theme ? '#eeeeee' : '#b0a9a9'}`,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  borderRadius: '15px',
                  px: 3,
                }}
              >
                <img src={item.data[1].image} alt='' style={{ height: '100px' }} />
                <Box>
                  <Typography sx={{ fontSize: '20px' }}>{item.data[1].name}</Typography>
                  <Typography sx={{ fontSize: '15px' }}>{item.data[1].description}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  backgroundColor: `${theme ? '#eeeeee' : '#b0a9a9'}`,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  borderRadius: '15px',
                  marginRight: '5px',
                  px: 3,
                }}
              >
                <img src={item.data[2].image} alt='' style={{ height: '100px' }} />
                <Box>
                  <Typography sx={{ fontSize: '20px' }}>{item.data[2].name}</Typography>
                  <Typography sx={{ fontSize: '15px' }}>{item.data[2].description}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Carousel>

      <Carousel
        indicators={false}
        navButtonsAlwaysVisible
        autoPlay
        animation='fade'
        stopAutoPlayOnHover
        duration={1500}
        interval={5000}
        sx={{ display: { xs: 'flex', md: 'none', flexDirection: 'column' } }}
      >
        {oneItem.map((item, index) => (
          <Grid key={index} container columns={1} sx={{ height: '180px', maxWidth: '80%', marginX: 'auto' }}>
            <Grid item xs={1}>
              <Box
                sx={{
                  backgroundColor: `${theme ? '#eeeeee' : '#b0a9a9'}`,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  borderRadius: '15px',
                  marginLeft: '5px',
                  px: 3,
                }}
              >
                <img src={item.image} alt='' style={{ height: '100px' }} />
                <Box>
                  <Typography sx={{ fontSize: '20px' }}>{item.name}</Typography>
                  <Typography sx={{ fontSize: '15px' }}>{item.description}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Carousel>
    </Box>
  );
};

export default Introduction;
