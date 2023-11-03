'use client';

import SortableLocationCard from '@/components/recommendation/list/SortableLocationCard';
import type { Recommendation } from '@/types/recommendation';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Box, Typography } from '@mui/material';
import type { FC } from 'react';
import { useContext } from 'react';
import { ActiveLocationContext } from '../ActiveLocationContext';

interface DroppableDateListProps {
  recommendation: Recommendation;
}

const DroppableDateList: FC<DroppableDateListProps> = ({ recommendation }) => {
  const activeLocationContext = useContext(ActiveLocationContext);
  const { setActiveLocation, setActiveStep, setActiveDate, setMapCenter } = activeLocationContext;

  const handleSelect = (index: number) => {
    setActiveLocation(recommendation.locations[index]);
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
      <Typography variant="h6" component="h2" sx={{ marginTop: 1 }}>
        {recommendation.date}
      </Typography>

      <Box sx={{ marginTop: 1 }}>
        {recommendation.locations.map((loc, index) => (
          <div key={`${loc}${index}`} onMouseDown={() => handleSelect(index)}>
            {recommendation.locations.length === 1 ? (
              <SortableLocationCard location={loc} disabled={true} />
            ) : (
              <SortableLocationCard location={loc} />
            )}
          </div>
        ))}
      </Box>
      {/* TODO: Refactor stepper when implement the travel duration */}
      {/* <Stepper activeStep={activeStep} orientation="vertical" style={{ minHeight: '100px' }}>
        {recommendation.locations.map((step, index) => (
          <Step key={step.name} active={true}>
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
              <Typography variant="body1">{step.name}</Typography>
            </StepLabel>
            <StepContent onMouseDown={() => handleSelect(index)}>
              {recommendation.locations.length === 1 ? (
                <SortableLocationCard step={step} disabled={true} />
              ) : (
                <SortableLocationCard step={step} />
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper> */}
    </SortableContext>
  );
};

export default DroppableDateList;
