import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Typography } from '@mui/material';

import FeaturedCard from '@/components/recommendation/prompt/featured/FeaturedCard';
import { getScopedI18n } from '@/locales/server';
import { featuredLocations } from '@/types/featured';

const Featured = async () => {
  const t = await getScopedI18n('home');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 8,
          gap: 2,
          textAlign: 'left',
          marginBottom: 2,
        }}
      >
        <TrendingUpIcon fontSize="large" color="primary" />
        <Box sx={{ display: 'block' }}>
          <Typography variant="h4" component="h2">
            {t('featured-title')}
          </Typography>
          <Typography variant="subtitle2">{t('featured-subtitle')}</Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, overflow: 'auto', marginBottom: 4 }}
      >
        {featuredLocations.map((location) => (
          <FeaturedCard key={location} location={location} />
        ))}
      </Box>
    </>
  );
};

export default Featured;
