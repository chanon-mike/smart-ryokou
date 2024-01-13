import PlaceIcon from '@mui/icons-material/Place';
import { Box, Card, CardMedia, Skeleton, Typography } from '@mui/material';
import { Suspense } from 'react';

import { I18nProvider } from '@/components/common/I18nProvider';
import FeaturedCardImage from '@/components/recommendation/prompt/featured/FeaturedCardImage';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';
import type { FeaturedLocation } from '@/types/featured';

type FeaturedCardProps = {
  location: FeaturedLocation;
};

const FeaturedCard = async ({ location }: FeaturedCardProps) => {
  const t = await getScopedI18n('home.featured');
  const currentLocale = getCurrentLocale();

  return (
    <Suspense fallback={<Skeleton />}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Card variant="elevation" sx={{ width: 200, height: 200, cursor: 'pointer' }}>
          <CardMedia>
            <I18nProvider locale={currentLocale}>
              <FeaturedCardImage location={location} />
            </I18nProvider>
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
          <Typography variant="body2">{t(`${location}`)}</Typography>
        </Box>
      </Box>
    </Suspense>
  );
};

export default FeaturedCard;
