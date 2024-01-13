import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { Suspense } from 'react';

import LanguageMenu from '@/components/common/LanguageMenu';

const Navbar = async () => {
  // const session = await getSession();

  return (
    <AppBar
      elevation={0}
      color="inherit"
      sx={{ backgroundColor: 'transparent', backdropFilter: 'blur(5px)', position: 'fixed' }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
          <Link href="/">
            <IconButton size="large" edge="start" color="primary" aria-label="menu">
              <HomeIcon />
            </IconButton>
          </Link>
          <Link href="/" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
          </Link>
        </Box>

        <Suspense>
          <LanguageMenu />
        </Suspense>
        {/* {!session ? (
            <a href="/api/auth/login">
              <Button color="primary">Login</Button>
            </a>
          ) : (
            <a href="/api/auth/logout">
              <Button color="primary">Logout</Button>
            </a>
          )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
