import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearAccount } from '../redux/slices/accountSlice';
import { clearCartFromLocalStorage, clearTokenAndAccountFromLocalStorage } from '../utils/localStorage';
import { AppContext } from '../App';
import { clearCart } from '../redux/slices/cartSlice';
import { setNotification } from '../redux/slices/notificationSlice';

const settings = [
  { name: 'Profile', path: '/account' },
  { name: 'Switch account', path: '/account/login' },
  { name: 'Logout', path: '/account/login' },
];

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Authors', path: '/authors' },
  { name: 'Genres', path: '/genres' },
  { name: 'Create', path: '/' },
];

const NotLoggedIn = () => {
  return (
    <Box>
      <Link to='/account/login'>
        <Button variant='text' sx={{ color: 'white' }}>
          Log In
        </Button>
      </Link>
      <Link to='/account/signup'>
        <Button variant='contained'>Sign Up</Button>
      </Link>
    </Box>
  );
};

const LoggedIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSetting = (_event: React.MouseEvent<HTMLElement>, settingName: string) => {
    if (settingName === 'Profile') {
      navigate('/account');
      return;
    }
    if (settingName === 'Logout' || settingName === 'Switch account') {
      dispatch(clearAccount());
      dispatch(clearCart());
      clearTokenAndAccountFromLocalStorage();
      clearCartFromLocalStorage();
      dispatch(setNotification({ message: 'Logout successfully', type: 'success' }));
      navigate('/account/login');
      return;
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: '15px' }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
            <Button size='small' onClick={(event) => handleSetting(event, setting.name)}>
              {setting.name}
            </Button>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const Header = () => {
  const account = useAppSelector((state) => state.account.account);
  const { theme, setTheme } = useContext(AppContext);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          {/* Display when wide */}
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LIBRARY
          </Typography>

          {/* Display when narrow */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.path}>{page.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Library
          </Typography>

          {/* Display when wide */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page.path} key={page.name} style={{ textDecoration: 'none' }}>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Tooltip title={theme ? 'Dark theme' : 'Light theme'} sx={{ marginX: '10px' }}>
            <IconButton onClick={() => setTheme(!theme)}>{theme ? <DarkModeIcon /> : <LightModeIcon />}</IconButton>
          </Tooltip>
          {account ? <LoggedIn /> : <NotLoggedIn />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
