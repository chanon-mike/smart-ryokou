import { Box, Card, CardMedia, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlaceIcon from '@mui/icons-material/Place';
import createTranslation from 'next-translate/useTranslation';

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
        <TrendingUpIcon fontSize="large" />
        <Box sx={{ display: 'block' }}>
          <Typography variant="h4" component="h2">
            Featured
          </Typography>
          <Typography variant="subtitle2">Most popular city for traveling</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, overflow: 'auto' }}>
        {featuredLocations.map((location) => (
          <FeaturedCard key={location} location={location} />
        ))}
      </Box>
    </>
  );
};

const FeaturedCard = ({ location }: { location: string }) => {
  const { t } = createTranslation('home');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Card variant="elevation" sx={{ width: 200, height: 200, cursor: 'pointer' }}>
        {/* TODO: Add image from s3 */}
        <CardMedia component="img" height="200px" />
      </Card>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 0.5,
          paddingBottom: 1,
        }}
      >
        <PlaceIcon color="secondary" fontSize="small" />
        <Typography variant="body2">{t(`featured.${location}`)}</Typography>
      </Box>
    </Box>
  );
};

export default Featured;
