import { Box, Container, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

import Featured from '@/components/recommendation/prompt/featured/Featured';
import Prompt from '@/components/recommendation/prompt/Prompt';

const Home = () => {
  const homeT = createTranslation('home');
  const commonT = createTranslation('common');
  const ht = homeT.t;
  const ct = commonT.t;

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 120,
          marginTop: 15,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { sm: 'row', xs: 'column' },
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 120,
          }}
        >
          <Typography variant="h1" sx={{ paddingBottom: { sm: 1.5 } }}>
            Smart
          </Typography>
          <Typography
            variant="h1"
            sx={{
              paddingLeft: { sm: 2 },
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
