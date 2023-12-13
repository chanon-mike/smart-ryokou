import Featured from '@/components/recommendation/prompt/Featured';
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
      <Box display="flex" flexDirection="column" marginTop={15} maxWidth="100%">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 120,
          }}
        >
          <Typography variant="h1" sx={{ paddingBottom: 1.5 }}>
            Smart
          </Typography>
          <Typography
            variant="h1"
            sx={{
              paddingLeft: 2,
              paddingBottom: 1.5,
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
        <Typography variant="subtitle1" color="text.secondary" sx={{ alignSelf: 'center' }}>
          {ht('caption')}
        </Typography>
        <Prompt />
        <Featured />
      </Box>
    </Container>
  );
};

export default Home;
