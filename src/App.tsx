import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';
import { createContext, useEffect, useState } from 'react';
import { getThemeFromLocalStorage, saveThemeToLocalStorage } from './utils/localStorage';

type AppContextProps = {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextProps>({
  theme: true,
  setTheme: function () {},
});

const App = () => {
  const [theme, setTheme] = useState<boolean>(true);

  useEffect(() => {
    let themeInLocalStorage = getThemeFromLocalStorage();
    if (themeInLocalStorage && themeInLocalStorage === 'dark') {
      setTheme(false);
    }
  }, []);

  useEffect(() => {
    saveThemeToLocalStorage(`${theme ? 'light' : 'dark'}`);
  }, [theme]);

  const darkTheme = createTheme({
    palette: {
      mode: `${theme ? 'light' : 'dark'}`,
      primary: {
        light: '#aed581',
        main: '#79955a',
        dark: '#aed581',
        contrastText: '#bedd9a',
      },
    },
  });

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
