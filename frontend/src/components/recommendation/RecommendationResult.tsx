'use client';

import RecommendationContainer from './RecommendationContainer';
import Map from '@/components/map/Map';
import { Box, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import type { Recommendation } from '@/types/recommendation';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';

interface RecommendationResultProps {
  recommendations: Recommendation[];
  setRecommendations: Dispatch<SetStateAction<Recommendation[]>>;
}

const RecommendationResult: FC<RecommendationResultProps> = ({
  recommendations,
  setRecommendations,
}) => {
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
          {/* Left side: Recommendation container */}
          <RecommendationContainer
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

export default RecommendationResult;
