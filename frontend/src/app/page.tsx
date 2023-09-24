import InputBar from '@/components/prompt/InputBar';
import { Box, Container, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import ResultScreen from '@/components/result/ui/ResultScreen';
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
          {t('title')}
        </Typography>
        <InputBar />
      </Box>
      <ResultScreen height="100vh" />
    </Container>
  );
};

export default Home;
