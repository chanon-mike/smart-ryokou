import { Box, Container, Typography } from '@mui/material';

import { I18nProvider } from '@/components/common/I18nProvider';
import Featured from '@/components/recommendation/prompt/featured/Featured';
import Prompt from '@/components/recommendation/prompt/Prompt';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';

const Home = async () => {
  const ht = await getScopedI18n('home');
  const ct = await getScopedI18n('common');
  const currentLocale = getCurrentLocale();

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
        <I18nProvider locale={currentLocale}>
          <Prompt />
        </I18nProvider>
        <Featured />
      </Box>
    </Container>
  );
};

export default Home;
