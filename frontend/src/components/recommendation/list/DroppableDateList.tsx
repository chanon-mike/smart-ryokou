'use client';

import SortableLocationCard from '@/components/recommendation/list/SortableLocationCard';
import type { Location, Recommendation } from '@/types/recommendation';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Box, Skeleton, Typography } from '@mui/material';
import type { FC } from 'react';
import { useContext } from 'react';
import { ActiveLocationContext } from '@/components/recommendation/ActiveLocationContext';
import { SecondaryColorHoverIconButton } from '@/components/common/mui/SecondaryColorHoverIconButton';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { useDistanceMatrix } from '@/components/recommendation/list/useDistanceMatrix';
import DistanceMatrixStep from '@/components/recommendation/list/distance-matrix/DistanceMatrixStep';
import TotalDuration from '@/components/recommendation/list/distance-matrix/TotalDuration';

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
  const { distanceMatrix, isLoadingDistanceMatrix, totalDistanceMatrix } =
    useDistanceMatrix(recommendation);

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
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          {recommendation.date}
        </Typography>
        <SecondaryColorHoverIconButton onClick={handleSelectDate} sx={{ paddingBottom: 0 }}>
          <PinDropIcon />
        </SecondaryColorHoverIconButton>
        <TotalDuration
          isLoadingDistanceMatrix={isLoadingDistanceMatrix}
          totalDistanceMatrix={totalDistanceMatrix}
        />
      </Box>

      <Box sx={{ marginTop: 1 }}>
        {recommendation.locations.map((loc, index) => {
          const locationsLength = recommendation.locations.length;

          return (
            <div key={`${loc}${index}`}>
              {locationsLength === 1 ? (
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
                <>
                  <SortableLocationCard
                    location={loc}
                    index={index}
                    recIndex={recIndex}
                    onSelect={handleSelect}
                    onConfirmDelete={onConfirmDeleteCard}
                    onFindRestaurant={onFindRestaurant}
                  />
                  {/* Distance and Duration with loading skeleton */}
                  {index < locationsLength - 1 &&
                    (!isLoadingDistanceMatrix ? (
                      <DistanceMatrixStep
                        key={recommendation.locations[index].id}
                        distance={distanceMatrix[index]?.distance.text}
                        duration={distanceMatrix[index]?.duration.text}
                      />
                    ) : (
                      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    ))}
                </>
              )}
            </div>
          );
        })}
      </Box>
    </SortableContext>
  );
};

export default DroppableDateList;
