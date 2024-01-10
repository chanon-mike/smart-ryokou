'use client';

import type { UniqueIdentifier } from '@dnd-kit/core';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import MapIcon from '@mui/icons-material/Map';
import { Box, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import { useContext, useState } from 'react';

import DroppableDateList from '@/components/recommendation/list/DroppableDateList';
import FindRestaurantDialog from '@/components/recommendation/list/find-restaurant/FindRestaurantDialog';
import { useFindRestaurant } from '@/components/recommendation/list/find-restaurant/useFindRestaurant';
import SortableLocationCard from '@/components/recommendation/list/location-card/SortableLocationCard';
import NewLocationButton from '@/components/recommendation/list/new-location/NewLocationButton';
import { useDnd } from '@/components/recommendation/list/useDnd';
import RouteDirectionArrowToggleButton from '@/components/recommendation/map/RouteDirectionArrowToggleButton';
import { RecommendationContext } from '@/components/recommendation/RecommendationContext';
import { saveNewSessionData } from '@/libs/helper';

import DeleteLocationDialog from './location-card/DeleteLocationDialog';

const RecommendationContainer = () => {
  const { session, setSession } = useContext(RecommendationContext);
  const [activeContainerIndex, setActiveContainerIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [locationIdToDelete, setLocationIdToDelete] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    findRestaurantOpen,
    restaurants,
    loadingRestaurants,
    handleFindRestaurant,
    handleCloseDialog,
    handleSelectRestaurant,
  } = useFindRestaurant({ session, setSession });
  const { sensors, handleDragStart, handleDragOver, handleDragCancel, handleDragEnd } = useDnd({
    session,
    setSession,
    setActiveId,
    activeContainerIndex,
    setActiveContainerIndex,
  });

  const handleConfirmDeleteCard = (locationId: string) => {
    setLocationIdToDelete(locationId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = (locationId: string) => {
    const updatedSession = _.cloneDeep(session);
    const updatedRecommendations = _.cloneDeep(session.recommendations);
    for (const group of updatedRecommendations) {
      const updatedLocations = group.locations.filter((location) => {
        return location.id !== locationId;
      });
      group.locations = updatedLocations;
    }
    updatedSession.recommendations = updatedRecommendations;
    saveNewSessionData(updatedSession);
    setSession(updatedSession);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        modifiers={[restrictToVerticalAxis]}
      >
        <Box>
          <SessionSubHeader />
          <Box sx={{ height: '75vh', overflowY: 'auto' }}>
            {session.recommendations.map((r, index) => (
              <Box key={`${r.date}-${index}`} sx={{ paddingRight: '20px' }}>
                <DroppableDateList
                  recIndex={index}
                  recommendation={r}
                  onConfirmDeleteCard={handleConfirmDeleteCard}
                  onFindRestaurant={handleFindRestaurant}
                />
                <NewLocationButton dateIndex={index} />
              </Box>
            ))}
          </Box>
          <DragOverlay style={{ paddingRight: '20px' }}>
            {activeId !== null && activeContainerIndex !== null ? (
              <SortableLocationCard
                location={
                  session.recommendations[activeContainerIndex].locations.filter(
                    (loc) => loc.id === activeId,
                  )[0]
                }
                index={0}
                onSelect={() => {}}
                onConfirmDelete={() => {}}
              />
            ) : null}
          </DragOverlay>
        </Box>
      </DndContext>

      <DeleteLocationDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        locationId={locationIdToDelete}
        handleDelete={handleDelete}
      />
      <FindRestaurantDialog
        findRestaurantOpen={findRestaurantOpen}
        restaurants={restaurants}
        loadingRestaurants={loadingRestaurants}
        handleCloseDialog={handleCloseDialog}
        handleSelectRestaurant={handleSelectRestaurant}
      />
    </>
  );
};

export default RecommendationContainer;

const SessionSubHeader = () => {
  const { session } = useContext(RecommendationContext);
  const tripLocation = session.tripTitle.replace('の旅行プラン', '');

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ marginBottom: 1, marginTop: { sm: 0, xs: 1 } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '15rem' }}
      >
        <MapIcon color="secondary" />
        <Typography color="textSecondary" variant="subtitle2" noWrap>
          {tripLocation}
        </Typography>
      </Stack>
      <RouteDirectionArrowToggleButton />
    </Stack>
  );
};
