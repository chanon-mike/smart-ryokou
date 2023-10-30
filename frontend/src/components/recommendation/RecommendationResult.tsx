'use client';

import RecommendationContainer from './list/RecommendationContainer';
import Map from '@/components/recommendation/map/Map';
import { Box, Typography } from '@mui/material';
import { ActiveLocationProvider } from './ActiveLocationContext';
import { useContext } from 'react';
import { RecommendationContext } from './RecommendationContext';

const RecommendationResult = () => {
  const { tripTitle } = useContext(RecommendationContext);

  return (
    <Box sx={{ marginTop: 10 }}>
      <Typography variant="h3" component="h3">
        {tripTitle}
      </Typography>
      <ActiveLocationProvider>
        <div style={{ height: '80vh', width: '80vw' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr' }}>
            {/* Left side: Recommendation container */}
            <RecommendationContainer />

            {/* Right side: Map */}
            <Map />
          </div>
        </div>
      </ActiveLocationProvider>
    </Box>
  );
};

export default RecommendationResult;
