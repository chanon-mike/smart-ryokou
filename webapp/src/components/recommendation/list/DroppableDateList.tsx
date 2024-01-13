'use client';

import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { Box, Paper, Skeleton, Tooltip, Typography } from '@mui/material';
import type { FC } from 'react';
import { useContext } from 'react';

import { SecondaryColorHoverIconButton } from '@/components/common/mui/SecondaryColorHoverIconButton';
import { ActiveLocationContext } from '@/components/recommendation/ActiveLocationContext';
import DistanceMatrixStep from '@/components/recommendation/list/distance-matrix/DistanceMatrixStep';
import TotalDuration from '@/components/recommendation/list/distance-matrix/TotalDuration';
import SortableLocationCard from '@/components/recommendation/list/location-card/SortableLocationCard';
import { useDistanceMatrix } from '@/components/recommendation/list/useDistanceMatrix';
import { useScopedI18n } from '@/locales/client';
import type { Location, Recommendation } from '@/types/recommendation';

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
  const { distanceMatrix, isLoadingDistanceMatrix } = useDistanceMatrix(recommendation);

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
  const handleSelectZoomoutButton = () => {
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
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          p: 1,
          marginTop: { sm: 0, xs: 1 },
        }}
        variant="outlined"
      >
        <Typography variant="subtitle1">{recommendation.date}</Typography>
        <ZoomoutButton handleSelectZoomoutButton={handleSelectZoomoutButton} />
        <TotalDuration
          isLoadingDistanceMatrix={isLoadingDistanceMatrix}
          distanceMatrix={distanceMatrix}
        />
      </Paper>

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
                        distance={distanceMatrix[index]?.distance?.text}
                        duration={distanceMatrix[index]?.duration?.text}
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

type ZoomoutButtonProps = {
  handleSelectZoomoutButton: () => void;
};

const ZoomoutButton = ({ handleSelectZoomoutButton }: ZoomoutButtonProps) => {
  const t = useScopedI18n('result.tooltip');

  return (
    <SecondaryColorHoverIconButton
      onClick={handleSelectZoomoutButton}
      sx={{ alignItems: 'center' }}
    >
      <Tooltip disableFocusListener disableTouchListener title={t('zoomout')} placement="top">
        <PinDropIcon />
      </Tooltip>
    </SecondaryColorHoverIconButton>
  );
};
