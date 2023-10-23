'use client';

import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import type { Recommendation } from '@/types/recommendation';
import { StepIcon } from '@mui/material';
import LocationCard from './LocationCard';
import { useDroppable } from '@dnd-kit/core';

interface LocationListingsProps {
  recommendation: Recommendation;
  setRecommendations: React.Dispatch<React.SetStateAction<Recommendation[]>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeDate: string;
  setActiveDate: React.Dispatch<React.SetStateAction<string>>;
  setMapCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}

const LocationListingsByDate: React.FC<LocationListingsProps> = ({
  recommendation,
  // setRecommendations,
  activeStep,
  setActiveStep,
  // activeDate,
  setActiveDate,
  setMapCenter,
}) => {
  const { setNodeRef } = useDroppable({ id: recommendation.date });

  const handleSelect = (index: number) => {
    setActiveStep(index);
    setActiveDate(recommendation.date);
    setMapCenter({
      lat: recommendation.locations[index].lat,
      lng: recommendation.locations[index].lng,
    });
  };

  return (
    <div ref={setNodeRef}>
      <Typography variant="h6" component="div" style={{ paddingTop: '20px' }}>
        {recommendation.date}
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {recommendation.locations.map((step, index) => (
          <Step key={step.name} active={true}>
            <div onClick={() => handleSelect(index)}>
              {/* Use StepIconComponent to make checkmark dissappear */}
              <StepLabel
                StepIconComponent={(props) => (
                  <StepIcon
                    {...props}
                    icon={props.icon}
                    active={props.active || props.completed}
                    completed={false}
                  />
                )}
              >
                {step.name}
              </StepLabel>
              <StepContent>
                <LocationCard step={step} />
              </StepContent>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default LocationListingsByDate;
