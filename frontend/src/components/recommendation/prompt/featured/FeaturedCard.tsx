import { Box, Card, CardMedia, Skeleton, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import createTranslation from 'next-translate/useTranslation';
import { Suspense } from 'react';
import FeaturedCardImage from './FeaturedCardImage';

type FeaturedCardProps = {
  location: string;
};

const FeaturedCard = ({ location }: FeaturedCardProps) => {
  const { t } = createTranslation('home');

  return (
    <Suspense fallback={<Skeleton />}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Card variant="elevation" sx={{ width: 200, height: 200, cursor: 'pointer' }}>
          <CardMedia>
            <FeaturedCardImage location={location} />
          </CardMedia>
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
    </Suspense>
  );
};

export default FeaturedCard;
