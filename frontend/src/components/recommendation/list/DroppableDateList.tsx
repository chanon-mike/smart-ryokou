'use client';

import SortableLocationCard from '@/components/recommendation/list/SortableLocationCard';
import type { Location, Recommendation } from '@/types/recommendation';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Box, Typography } from '@mui/material';
import type { FC } from 'react';
import { useContext } from 'react';
import { ActiveLocationContext } from '@/components/recommendation/ActiveLocationContext';
import { SecondaryColorHoverIconButton } from '@/components/common/mui/SecondaryColorHoverIconButton';
import PlaceIcon from '@mui/icons-material/Place';

interface DroppableDateListProps {
  recIndex: number;
  recommendation: Recommendation;
  onConfirmDeleteCard: (placeName: string) => void;
  onFindRestaurant: (recIndex: number, dateIndex: number, location: Location) => void;
}

const DroppableDateList: FC<DroppableDateListProps> = ({
  recIndex,
  recommendation,
  onConfirmDeleteCard,
  onFindRestaurant,
}) => {
  const activeLocationContext = useContext(ActiveLocationContext);
  const { setActiveLocation, setActiveStep, setActiveDate, setMapCenter, setZoom } =
    activeLocationContext;

  const handleSelect = (index: number) => {
    setActiveLocation(recommendation.locations[index]);
    setActiveStep(index);
    setActiveDate(recommendation.date);
    setMapCenter({
      lat: recommendation.locations[index].lat,
      lng: recommendation.locations[index].lng,
    });
    setZoom(16);
  };

  // Zoom and set center for each date plan
  const handleSelectDate = () => {
    // Get average lat lng of date locations
    const dateLocations = recommendation.locations;
    const averageLatLng = dateLocations.reduce(
      (acc, loc) => ({ lat: acc.lat + loc.lat, lng: acc.lng + loc.lng }),
      { lat: 0, lng: 0 },
    );

    averageLatLng.lat /= dateLocations.length;
    averageLatLng.lng /= dateLocations.length;

    setMapCenter(averageLatLng);
    setZoom(12);
  };

  return (
    <SortableContext
      items={recommendation.locations.map((loc) => loc.id)}
      strategy={rectSortingStrategy}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1 }}>
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          {recommendation.date}
        </Typography>
        <SecondaryColorHoverIconButton onClick={handleSelectDate} sx={{ paddingBottom: 0 }}>
          <PlaceIcon />
        </SecondaryColorHoverIconButton>
      </Box>

      <Box sx={{ marginTop: 1 }}>
        {recommendation.locations.map((loc, index) => (
          <div key={`${loc}${index}`}>
            {recommendation.locations.length === 1 ? (
              <SortableLocationCard
                location={loc}
                disabled={true}
                index={index}
                recIndex={recIndex}
                onSelect={handleSelect}
                onConfirmDelete={onConfirmDeleteCard}
                onFindRestaurant={onFindRestaurant}
              />
            ) : (
              <SortableLocationCard
                location={loc}
                index={index}
                recIndex={recIndex}
                onSelect={handleSelect}
                onConfirmDelete={onConfirmDeleteCard}
                onFindRestaurant={onFindRestaurant}
              />
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
            <StepContent>
              {recommendation.locations.length === 1 ? (
                <SortableLocationCard
                  step={step}
                  disabled={true}
                  index={index}
                  onSelect={handleSelect}
                  onConfirmDelete={onConfirmDeleteCard}
                />
              ) : (
                <SortableLocationCard
                  step={step}
                  index={index}
                  onSelect={handleSelect}
                  onConfirmDelete={onConfirmDeleteCard}
                />
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper> */}
    </SortableContext>
  );
};

export default DroppableDateList;
