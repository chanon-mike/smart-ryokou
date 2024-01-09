'use client';

import type { UniqueIdentifier } from '@dnd-kit/core';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import _ from 'lodash';
import createTranslation from 'next-translate/useTranslation';
import { useContext, useState } from 'react';

import DroppableDateList from '@/components/recommendation/list/DroppableDateList';
import FindRestaurantDialog from '@/components/recommendation/list/find-restaurant/FindRestaurantDialog';
import { useFindRestaurant } from '@/components/recommendation/list/find-restaurant/useFindRestaurant';
import NewLocationButton from '@/components/recommendation/list/new-location/NewLocationButton';
import SortableLocationCard from '@/components/recommendation/list/SortableLocationCard';
import { useDnd } from '@/components/recommendation/list/useDnd';
import { RecommendationContext } from '@/components/recommendation/RecommendationContext';
import { saveNewSessionData } from '@/libs/helper';

const RecommendationContainer = () => {
  const { session, setSession } = useContext(RecommendationContext);
  const [activeContainerIndex, setActiveContainerIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [locationIdToDelete, setLocationIdToDelete] = useState('');

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

  const handleConfirmDeleteCard = (locationId: string) => {
    setLocationIdToDelete(locationId);
    setDeleteModalOpen(true);
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
    closeConfirmationModal();
    setSession(updatedSession);
    saveNewSessionData(updatedSession);
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
        <Box style={{ height: '75vh', overflowY: 'auto', paddingRight: '20px' }}>
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
          <Button onMouseDown={() => handleDelete(locationIdToDelete)} autoFocus>
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
