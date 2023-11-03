import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { getSession } from '@auth0/nextjs-auth0';
import HomeIcon from '@mui/icons-material/Home';
import LanguageMenu from '@/components/common/LanguageMenu';

const Navbar = async () => {
  const session = await getSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="fixed"
        color="inherit"
        sx={{ backgroundColor: 'transparent', backdropFilter: 'blur(5px)' }}
      >
        <Toolbar>
          <a href="/">
            <IconButton size="large" edge="start" color="primary" aria-label="menu">
              <HomeIcon />
            </IconButton>
          </a>

          <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
            <Typography variant="h6" color="primary">
              Smart
            </Typography>
            <Typography
              variant="h6"
              sx={{
                backgroundcolor: 'primary',
                backgroundImage: `linear-gradient(90deg, rgba(77,112,217,1) 10%, rgba(217,77,112,1) 100%)`,
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              旅行
            </Typography>
          </Box>
          <LanguageMenu />
          {!session ? (
            <a href="/api/auth/login">
              <Button color="primary">Login</Button>
            </a>
          ) : (
            <a href="/api/auth/logout">
              <Button color="primary">Logout</Button>
            </a>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
