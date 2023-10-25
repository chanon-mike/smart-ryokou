'use client';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import type { Recommendation } from '@/types/recommendation';
import { StepIcon } from '@mui/material';
import SortableLocationCard from './SortableLocationCard';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import type { Dispatch, SetStateAction, FC } from 'react';

interface DroppableDateListProps {
  recommendation: Recommendation;
  setRecommendations: Dispatch<SetStateAction<Recommendation[]>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  activeDate: string;
  setActiveDate: Dispatch<SetStateAction<string>>;
  setMapCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

const DroppableDateList: FC<DroppableDateListProps> = ({
  recommendation,
  // setRecommendations,
  activeStep,
  setActiveStep,
  // activeDate,
  setActiveDate,
  setMapCenter,
}) => {
  const handleSelect = (index: number) => {
    setActiveStep(index);
    setActiveDate(recommendation.date);
    setMapCenter({
      lat: recommendation.locations[index].lat,
      lng: recommendation.locations[index].lng,
    });
  };

  return (
    <SortableContext
      items={recommendation.locations.map((loc) => loc.name)}
      strategy={rectSortingStrategy}
    >
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
                <SortableLocationCard step={step} />
              </StepContent>
            </div>
          </Step>
        ))}
      </Stepper>
    </SortableContext>
  );
};

export default DroppableDateList;
