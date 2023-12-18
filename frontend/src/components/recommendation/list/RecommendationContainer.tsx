'use client';

import { RecommendationContext } from '@/components/recommendation/RecommendationContext';
import DroppableDateList from '@/components/recommendation/list/DroppableDateList';
import SortableLocationCard from '@/components/recommendation/list/SortableLocationCard';
import NewLocationButton from '@/components/recommendation/list/new-location/NewLocationButton';
import { useDnd } from '@/components/recommendation/list/useDnd';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useContext, useState } from 'react';
import _ from 'lodash';
import createTranslation from 'next-translate/useTranslation';
import { DialogContent } from '@mui/material';
import type Session from '@/service/database/session/model';
import { CircularProgress } from '@mui/material';
import type { Location } from '@/types/recommendation';
import getRestaurantData from '@/client/helper/getRestaurantData';
import FindRestaurantCard from './find-restaurant/FindRestaurantCard';

const RecommendationContainer = () => {
  const { session, setSession } = useContext(RecommendationContext);
  const [activeContainerIndex, setActiveContainerIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState('');
  const [findRestaurantOpen, setFindRestaurantOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<Location[]>([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);

  const [allIndex, setAllIndex] = useState<{ recIndex: number; dateIndex: number }>({
    recIndex: 0,
    dateIndex: 0,
  });

  const { sensors, handleDragStart, handleDragOver, handleDragCancel, handleDragEnd } = useDnd({
    session,
    setSession,
    setActiveId,
    activeContainerIndex,
    setActiveContainerIndex,
  });

  const { t } = createTranslation('result');

  const closeConfirmationModal = () => {
    setDeleteModalOpen(false);
  };

  const handleConfirmDeleteCard = (placeName: string) => {
    setPlaceToDelete(placeName);
    setDeleteModalOpen(true);
  };

  const handleDelete = (placeName: string) => {
    const updatedSession = _.cloneDeep(session);
    const updatedRecommendations = _.cloneDeep(session.recommendations);
    for (const group of updatedRecommendations) {
      const updatedLocations = group.locations.filter((location) => {
        return location.name !== placeName;
      });
      group.locations = updatedLocations;
    }
    updatedSession.recommendations = updatedRecommendations;
    closeConfirmationModal();
    setSession(updatedSession);
  };

  const handleClose = () => {
    setFindRestaurantOpen(false);
  };

  const handleSelectRestaurant = (restaurant: Location) => {
    setRestaurants([]);

    setSession((prev: Session) => {
      const newRecommendations = [...prev.recommendations];
      newRecommendations[allIndex.recIndex].locations.splice(allIndex.dateIndex + 1, 0, restaurant);
      return { ...session, recommendations: newRecommendations };
    });

    setFindRestaurantOpen(false);
    return;
  };

  const handleFindRestaurant = async (recIndex: number, dateIndex: number, location: Location) => {
    setFindRestaurantOpen(true);
    setAllIndex({ recIndex, dateIndex });

    if (restaurants.length === 0) {
      setLoadingRestaurants(true);
      const res: Array<Location> = await getRestaurantData({
        latitude: location.lat,
        longitude: location.lng,
      });

      setRestaurants(res);
      setLoadingRestaurants(false);
    }

    return;
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
        <Box style={{ maxWidth: '400px', height: '75vh', overflowY: 'auto', paddingRight: '20px' }}>
          {session.recommendations.map((r, index) => (
            <Box key={`${r.date}-${index}`}>
              <DroppableDateList
                recIndex={index}
                recommendation={r}
                onConfirmDeleteCard={handleConfirmDeleteCard}
                onFindRestaurant={handleFindRestaurant}
              />
              <NewLocationButton dateIndex={index} />
            </Box>
          ))}
          <DragOverlay>
            {activeId !== null && activeContainerIndex !== null ? (
              <SortableLocationCard
                location={
                  session.recommendations[activeContainerIndex].locations.filter(
                    (r) => r.name === activeId,
                  )[0]
                }
              />
            ) : null}
          </DragOverlay>
        </Box>
      </DndContext>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('deleteCardModal.title')}</DialogTitle>
        <DialogActions>
          <Button onMouseDown={closeConfirmationModal}>{t('deleteCardModal.cancel')}</Button>
          <Button onMouseDown={() => handleDelete(placeToDelete)} autoFocus>
            {t('deleteCardModal.ok')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth={true} maxWidth={'lg'} open={findRestaurantOpen} onClose={handleClose}>
        <DialogTitle>{t('input.title')}</DialogTitle>
        <DialogContent>
          {loadingRestaurants ? (
            // Show a CircularProgress spinner while loading
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress />
            </Box>
          ) : (
            // Actual content with the list of restaurants
            <Box display="flex" justifyContent="center" my={2} gap={2}>
              {restaurants.map((restaurant, restaurantIndex) => (
                <FindRestaurantCard
                  key={`${restaurant.name}${restaurantIndex}`}
                  location={restaurant}
                  handleAddLocation={handleSelectRestaurant}
                />
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecommendationContainer;
