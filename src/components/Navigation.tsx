'use client';
import {useMessages, useTranslations} from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import IconifyIcon from '@/IconifyIcon';
import {signOut, useSession} from 'next-auth/react';
import {CircularProgress} from '@mui/material';
import {Session} from 'next-auth';
import {toggle as signInModelToggle} from '@/redux/store/signInModel';
import {useDispatch} from 'react-redux';
import {toggle} from '@/redux/store/settingsSlice';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Navigation({session}: {session: Session | null}) {
  const t = useTranslations('Navigation');
  const st = useTranslations('Settings');
  const authT = useTranslations('signInModel');
  const messages = useMessages();
  const dispatch = useDispatch();
  const navigation = Object.keys(messages.Navigation);
  const settings = Object.keys(messages.Settings);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const {status} = useSession();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        boxShadow: (theme) => theme.shadows[2]
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
          <Typography
            variant="h6"
            noWrap
            component={NavigationLink}
            href="/"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: {xs: 'block', md: 'none'}}}
            >
              {navigation?.map((page) => (
                <MenuItem
                  key={page}
                  LinkComponent={NavigationLink}
                  // @ts-expect-error: `page` is a key of `messages.Navigation`
                  href={`/${t(`${page}.href`)}`}
                  onClick={handleCloseNavMenu}
                >
                  <Typography sx={{textAlign: 'center'}}>
                    {/* @ts-expect-error: `page` is a key of `messages.Navigation` */}
                    {t(`${page}.title`)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} />
          <NavigationLink href={'/'}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              LOGO
            </Typography>
          </NavigationLink>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {navigation?.map((page) => (
              <Button
                key={page}
                component={NavigationLink}
                // @ts-expect-error: `page` is a key of `messages.Navigation`
                href={`/${t(`${page}.href`)}`}
                variant="text"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: (theme) => theme.palette.text.primary,
                  display: 'block',
                  textTransform: 'capitalize'
                }}
              >
                {/* @ts-expect-error: `page` is a key of `messages.Navigation` */}
                {t(`${page}.title`)}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            {/* Locale switcher */}
            <LocaleSwitcher />
            {/* Settings drawer button */}
            <IconButton sx={{ml: 1}} onClick={() => dispatch(toggle())}>
              <IconifyIcon icon="eva:settings-2-fill" />
            </IconButton>
            {/* User menu */}
            {status === 'loading' ? (
              <CircularProgress size={24} />
            ) : status === 'unauthenticated' && !session ? (
              <Button
                variant="contained"
                onClick={() => dispatch(signInModelToggle())}
              >
                {authT('signIn')}
              </Button>
            ) : (
              status === 'authenticated' &&
              session?.user && (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: '45px',
                      '& .MuiMenu-paper': {
                        minWidth: '150px'
                      }
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings?.map((setting) => {
                      // @ts-expect-error: `setting` is a key of `messages.Settings`
                      if (st(`${setting}.href`) === '/logout') {
                        return (
                          <MenuItem
                            key={setting}
                            onClick={() => {
                              handleCloseUserMenu();
                              // @ts-expect-error: `setting` is a key of `messages.Settings`
                              if (st(`${setting}.href`) === '/logout') {
                                signOut({
                                  callbackUrl: '/'
                                });
                              }
                            }}
                            sx={{
                              display: 'block',
                              textTransform: 'capitalize',
                              width: '100%',
                              color: 'text.primary',
                              justifyContent: 'start',
                              alignItems: 'start',
                              px: '18px !important',
                              '&:hover': {
                                backgroundColor: 'error.light',
                                color: 'error.contrastText'
                              }
                            }}
                          >
                            <Typography sx={{textAlign: 'left'}}>
                              {/* @ts-expect-error: st function returns a string that may not be a valid key for the Typography component */}
                              {st(`${setting}.title`)}
                            </Typography>
                          </MenuItem>
                        );
                      } else {
                        return (
                          // @ts-expect-error: `setting` is a key of `messages.Settings`
                          <MenuItem
                            key={setting}
                            component={NavigationLink}
                            // @ts-expect-error: `setting` is a key of `messages.Settings`
                            href={st(`${setting}.href`)}
                            hrefLang="en"
                            onClick={() => {
                              handleCloseUserMenu();
                            }}
                          >
                            {/* @ts-expect-error: st function returns a string that may not be a valid key for the Typography component */}
                            {st(`${setting}.title`)}
                          </MenuItem>
                        );
                      }
                    })}
                  </Menu>
                </>
              )
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
