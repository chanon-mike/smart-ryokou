'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useContext } from 'react';

import { ActiveLocationProvider } from '@/components/recommendation/ActiveLocationContext';
import RecommendationContainer from '@/components/recommendation/list/RecommendationContainer';
import Map from '@/components/recommendation/map/Map';
import { RecommendationContext } from '@/components/recommendation/RecommendationContext';

import ShareSocial from './share/ShareSocial';

const RecommendationResult = () => {
  const { session } = useContext(RecommendationContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ marginTop: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { sm: 'row', xs: 'column' },
          justifyContent: 'space-between',
          marginBottom: 1.5,
        }}
      >
        <Typography variant="h3" component="h3" sx={{ fontSize: { sm: '3rem', xs: '2.25rem' } }}>
          {session.tripTitle}
        </Typography>
        <ShareSocial />
      </Box>
      <ActiveLocationProvider>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '4fr 8fr', xs: '1fr' },
          }}
        >
          {isMobile ? (
            <>
              <Map />
              <RecommendationContainer />
            </>
          ) : (
            <>
              <RecommendationContainer />
              <Map />
            </>
          )}
        </Box>
      </ActiveLocationProvider>
    </Box>
  );
};

export default RecommendationResult;
