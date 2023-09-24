'use client';

import React, { useState } from 'react';
import LocationListings from './LocationListings';
import Map from '@/components/Map/Map';
import type { Location } from './types';
import { Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

const defaultLocations: Location[] = [
  {
    name: 'Tokyo',
    description: 'The capital city of Japan',
    lat: 35.682839,
    lng: 139.759455,
  },
  {
    name: 'Osaka',
    description: 'Known for its vibrant nightlife and street food',
    lat: 34.693737,
    lng: 135.502165,
  },
  {
    name: 'Kyoto',
    description: 'Famous for its temples and traditional culture',
    lat: 35.011564,
    lng: 135.768149,
  },
  {
    name: 'Hokkaido',
    description: "Japan's northernmost island with beautiful landscapes",
    lat: 43.220327,
    lng: 142.863474,
  },
  {
    name: 'Fukuoka',
    description: 'Known for its rich history and delicious food',
    lat: 33.590355,
    lng: 130.401716,
  },
];

const ResultScreen: React.FC = () => {
  const [locationList] = useState<Location[]>(defaultLocations);
  const [activeStep, setActiveStep] = useState<number>(0);
  const { t } = createTranslation('result');

  return (
    <>
      <Typography variant="h3" component="h3">
        {t('title', { name: 'Tokyo' })}
      </Typography>
      <div style={{ height: '80vh', width: '80vw' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr' }}>
          {/* Left side: LocationListings */}
          <div>
            <LocationListings
              locations={locationList}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>

          {/* Right side: Map */}
          <div>
            <Map
              lat={locationList[activeStep]?.lat || 0}
              lng={locationList[activeStep]?.lng || 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultScreen;
