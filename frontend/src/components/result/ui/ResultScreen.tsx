'use client';

import React, { useState } from 'react';
import LocationListings from './LocationListings';
import Map from '@/components/map/Map';
import { Box, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import type { Recommendation } from '@/types/recommendation';

interface ResultScreenProps {
  recommendations: Recommendation[];
  setRecommendations: React.Dispatch<React.SetStateAction<Recommendation[]>>;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ recommendations, setRecommendations }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeDate, setActiveDate] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  const { t } = createTranslation('result');

  return (
    <Box sx={{ marginTop: 10 }}>
      <Typography variant="h3" component="h3">
        {t('title', { name: 'Tokyo' })}
      </Typography>
      <div style={{ height: '80vh', width: '80vw' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr' }}>
          {/* Left side: LocationListings */}
          <LocationListings
            recommendations={recommendations}
            setRecommendations={setRecommendations}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            setMapCenter={setMapCenter}
          />

          {/* Right side: Map */}
          <Map lat={mapCenter.lat} lng={mapCenter.lng} />
        </div>
      </div>
    </Box>
  );
};

export default ResultScreen;
