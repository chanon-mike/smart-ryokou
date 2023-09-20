import { Box, Container, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

const Home = async () => {
  const { t } = createTranslation('common');

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
      </Box>
    </Container>
  );
};

export default Home;
