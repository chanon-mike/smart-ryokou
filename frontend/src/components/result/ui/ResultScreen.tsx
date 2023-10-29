'use client';

import React, { useState } from 'react';
import LocationListings from './LocationListings';
import Map from '@/components/map/Map';
import { Box, CircularProgress, Typography } from '@mui/material';
import type { Recommendation } from '@/types/recommendation';

interface ResultScreenProps {
  tripTitle: string;
  recommendations: Recommendation[];
}

const ResultScreen: React.FC<ResultScreenProps> = ({ tripTitle, recommendations }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeDate, setActiveDate] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  return recommendations?.length === 0 ? (
    <CircularProgress />
  ) : (
    <Box sx={{ marginTop: 10 }}>
      <Typography variant="h3" component="h3">
        {tripTitle}
      </Typography>
      <div style={{ height: '80vh', width: '80vw' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr' }}>
          {/* Left side: LocationListings */}
          <div>
            <LocationListings
              recommendations={recommendations}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              activeDate={activeDate}
              setActiveDate={setActiveDate}
              setMapCenter={setMapCenter}
            />
          </div>

          {/* Right side: Map */}
          <div>
            <Map lat={mapCenter.lat} lng={mapCenter.lng} />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ResultScreen;
