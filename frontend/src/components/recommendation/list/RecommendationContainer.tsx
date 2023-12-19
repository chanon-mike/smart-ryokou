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
import { useFindRestaurant } from './find-restaurant/useFindRestaurant';
import FindRestaurantDialog from './find-restaurant/FindRestaurantDialog';

const RecommendationContainer = () => {
  const { session, setSession } = useContext(RecommendationContext);
  const [activeContainerIndex, setActiveContainerIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState('');
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
