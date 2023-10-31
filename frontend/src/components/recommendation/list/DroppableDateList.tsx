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
import type { FC } from 'react';
import { useContext } from 'react';
import { ActiveLocationContext } from '../ActiveLocationContext';
import NewLocationButton from './NewLocationButton';

interface DroppableDateListProps {
  recommendation: Recommendation;
}

const DroppableDateList: FC<DroppableDateListProps> = ({ recommendation }) => {
  const activeLocationContext = useContext(ActiveLocationContext);
  const [activeStep, setActiveStep] = activeLocationContext.activeStep;
  const [, setActiveDate] = activeLocationContext.activeDate;
  const [, setMapCenter] = activeLocationContext.mapCenter;

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
      <Stepper activeStep={activeStep} orientation="vertical" style={{ minHeight: '100px' }}>
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
                {recommendation.locations.length === 1 ? (
                  <SortableLocationCard step={step} disabled={true} />
                ) : (
                  <SortableLocationCard step={step} />
                )}
              </StepContent>
            </div>
            {/* If last index, add new location button */}
            {index === recommendation.locations.length - 1 && <NewLocationButton />}
          </Step>
        ))}
      </Stepper>
    </SortableContext>
  );
};

export default DroppableDateList;
