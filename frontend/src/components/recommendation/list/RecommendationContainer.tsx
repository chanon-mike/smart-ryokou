'use client';

import { RecommendationContext } from '@/components/recommendation/RecommendationContext';
import DroppableDateList from '@/components/recommendation/list/DroppableDateList';
import SortableLocationCard from '@/components/recommendation/list/SortableLocationCard';
import NewLocationButton from '@/components/recommendation/list/new-location/NewLocationButton';
import { useDnd } from '@/components/recommendation/list/useDnd';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Box } from '@mui/material';
import { useContext, useState } from 'react';

const RecommendationContainer = () => {
  const { recommendations, setRecommendations } = useContext(RecommendationContext);
  const [activeContainerIndex, setActiveContainerIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const { sensors, handleDragStart, handleDragOver, handleDragCancel, handleDragEnd } = useDnd({
    recommendations,
    setRecommendations,
    setActiveId,
    activeContainerIndex,
    setActiveContainerIndex,
  });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      modifiers={[restrictToVerticalAxis]}
    >
      <Box style={{ maxWidth: '400px', height: '70vh', overflowY: 'auto', paddingRight: '20px' }}>
        {recommendations.map((r, index) => (
          <>
            <DroppableDateList key={r.date} recommendation={r} />
            <NewLocationButton dateIndex={index} />
          </>
        ))}
        <DragOverlay>
          {activeId !== null && activeContainerIndex !== null ? (
            <SortableLocationCard
              step={
                recommendations[activeContainerIndex].locations.filter(
                  (r) => r.name === activeId,
                )[0]
              }
            />
          ) : null}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default RecommendationContainer;
