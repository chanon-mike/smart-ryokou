'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import type { Recommendation } from '@/types/recommendation';
import LocationListingsByDate from './LocationListingsByDate';
interface LocationListingsProps {
  recommendations: Recommendation[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeDate: string;
  setActiveDate: React.Dispatch<React.SetStateAction<string>>;
  setMapCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}

const LocationListings: React.FC<LocationListingsProps> = ({
  recommendations,
  activeStep,
  setActiveStep,
  activeDate,
  setActiveDate,
  setMapCenter,
}) => {
  return (
    <Box style={{ maxWidth: '400px', height: '70vh', overflowY: 'auto' }}>
      {recommendations.map((r: Recommendation, index: number) => {
        return (
          <LocationListingsByDate
            key={index}
            recommendation={r}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            setMapCenter={setMapCenter}
          />
        );
      })}
    </Box>
  );
};

export default LocationListings;
