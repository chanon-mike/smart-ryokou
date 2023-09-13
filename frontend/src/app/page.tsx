import { Box, Container, Typography } from '@mui/material';
import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import createTranslation from 'next-translate/useTranslation';

const Home = async () => {
  const { t } = createTranslation('common');
  const session = await getSession();

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100dvh"
        maxWidth="100%"
      >
        <Typography variant="h1" component="h1">
          Smart Ryokou
        </Typography>
        <Typography variant="h6" gutterBottom>
          {t('test')}
        </Typography>
        <Link href="/?lang=en" as="/en">
          English
        </Link>
        <Link href="/?lang=ja" as="/ja">
          日本語
        </Link>
        <hr />
        {!session ? (
          <a href="/api/auth/login">Login</a>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <a href="/api/auth/logout">Logout</a>
            <Typography variant="h5" component="p">
              {session.user?.name}
            </Typography>
            <Typography variant="body1" component="p">
              {session.user?.email}
            </Typography>
            <Typography variant="body1" component="p">
              {session.user?.sub}
            </Typography>
            <Typography variant="body1" component="p">
              {session.accessToken}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
