import Prompt from '@/components/recommendation/prompt/Prompt';
import { Container, Box, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

const Home = () => {
  const homeT = createTranslation('home');
  const commonT = createTranslation('common');
  const ht = homeT.t;
  const ct = commonT.t;

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
        <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: 120 }}>
          <Typography variant="h1">Smart</Typography>
          <Typography
            variant="h1"
            sx={{
              paddingLeft: 2,
              backgroundcolor: 'primary',
              backgroundImage: `linear-gradient(90deg, rgba(77,112,217,1) 10%, rgba(217,77,112,1) 100%)`,
              backgroundSize: '100%',
              backgroundRepeat: 'repeat',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {ct('travel')}
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          {ht('caption')}
        </Typography>
        <Prompt />
      </Box>
    </Container>
  );
};

export default Home;
