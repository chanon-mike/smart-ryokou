import { Box, Container, Typography } from '@mui/material';
import { getSession } from '@auth0/nextjs-auth0';

const Home = async () => {
  const session = await getSession();

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100dvh"
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Smart Ryokou
        </Typography>
        {!session ? (
          <a href="/api/auth/login">Login</a>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <a href="/api/auth/logout">Logout</a>
            <Typography variant="h5" component="p">
              {session.user?.name}
            </Typography>
            <Typography variant="body1" component="p">
              {session.user?.email}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
