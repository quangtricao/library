import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';

const theme = createTheme({
  palette: {
    primary: {
      light: '#aed581',
      main: '#79955a',
      dark: '#aed581',
      contrastText: '#bedd9a',
    },
    secondary: {
      light: '#b9f6ca',
      main: '#81ac8d',
      dark: '#b9f6ca',
      contrastText: '#c7f7d4',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
