'use client';

import { Box, Card, CardMedia, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import createTranslation from 'next-translate/useTranslation';

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

export default FeaturedCard;
