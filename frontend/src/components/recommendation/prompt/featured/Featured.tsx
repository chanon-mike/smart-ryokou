import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import createTranslation from 'next-translate/useTranslation';
import FeaturedCard from './FeaturedCard';

const featuredLocations = [
  'tokyo',
  'kyoto',
  'osaka',
  'hokkaido',
  'okinawa',
  'nara',
  'nagoya',
  'kanazawa',
  'yokohama',
  'nikko',
];

const Featured = () => {
  const { t } = createTranslation('home');

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
