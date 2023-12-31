'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useContext } from 'react';

import { ActiveLocationProvider } from '@/components/recommendation/ActiveLocationContext';
import RecommendationContainer from '@/components/recommendation/list/RecommendationContainer';
import Map from '@/components/recommendation/map/Map';
import { RecommendationContext } from '@/components/recommendation/RecommendationContext';

const RecommendationResult = () => {
  const { session } = useContext(RecommendationContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ marginTop: 8 }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ fontSize: { sm: '3rem', xs: '2.25rem' }, marginBottom: 1.5 }}
      >
        {session.tripTitle}
      </Typography>
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
