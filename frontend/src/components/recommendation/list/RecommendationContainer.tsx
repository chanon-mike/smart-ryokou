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

const RecommendationContainer = () => {
  const { session, setSession } = useContext(RecommendationContext);
  const [activeContainerIndex, setActiveContainerIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState('');

  const { sensors, handleDragStart, handleDragOver, handleDragCancel, handleDragEnd } = useDnd({
    session,
    setSession,
    setActiveId,
    activeContainerIndex,
    setActiveContainerIndex,
  });

  const { t } = createTranslation('home');

  const closeConfirmationModal = () => {
    setDeleteModalOpen(false);
  };

  const handleConfirmDeleteCard = (placeName: string) => {
    setPlaceToDelete(placeName);
    setDeleteModalOpen(true);
  };

  const handleDelete = (placeName: string) => {
    const updatedRecommendations = _.cloneDeep(recommendations);
    for (const group of updatedRecommendations) {
      const updatedLocations = group.locations.filter((location) => {
        return location.name !== placeName;
      });
      group.locations = updatedLocations;
    }
    closeConfirmationModal();
    setRecommendations(updatedRecommendations);
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
              <DroppableDateList recommendation={r} onConfirmDeleteCard={handleConfirmDeleteCard} />
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
    </>
  );
};

export default RecommendationContainer;
