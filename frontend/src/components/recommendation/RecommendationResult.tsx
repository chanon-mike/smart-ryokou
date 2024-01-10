'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useContext } from 'react';

import { ActiveLocationProvider } from '@/components/recommendation/ActiveLocationContext';
import { DisplayRoutesProvider } from '@/components/recommendation/DisplayRoutesContext';
import RecommendationContainer from '@/components/recommendation/list/RecommendationContainer';
import Map from '@/components/recommendation/map/Map';
import { RecommendationContext } from '@/components/recommendation/RecommendationContext';

import ShareSocial from './share/ShareSocial';

const RecommendationResult = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderRecommendationsWithMap = () => {
    if (isMobile) {
      return (
        <>
          <Map />
          <RecommendationContainer />
        </>
      );
    }

    return (
      <>
        <RecommendationContainer />
        <Map />
      </>
    );
  };

  return (
    <Box sx={{ marginTop: 8 }}>
      <SessionHeader />
      <ActiveLocationProvider>
        <DisplayRoutesProvider>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { sm: '4fr 8fr', xs: '1fr' },
            }}
          >
            {renderRecommendationsWithMap()}
          </Box>
        </DisplayRoutesProvider>
      </ActiveLocationProvider>
    </Box>
  );
};

export default RecommendationResult;

const SessionHeader = () => {
  const { session } = useContext(RecommendationContext);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { sm: 'row', xs: 'column' },
        justifyContent: 'space-between',
        marginBottom: 1.5,
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ fontSize: { sm: '3rem', xs: '2.25rem' }, marginBottom: { sm: 0, xs: 1.5 } }}
      >
        {session.tripTitle}
      </Typography>
      <ShareSocial />
    </Box>
  );
};
