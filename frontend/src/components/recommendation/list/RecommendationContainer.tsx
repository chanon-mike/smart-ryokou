'use client';

import Box from '@mui/material/Box';
import type { Recommendation } from '@/types/recommendation';
import DroppableDateList from './DroppableDateList';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { DndContext, closestCorners, DragOverlay } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableLocationCard from './SortableLocationCard';
import { useContext, useState } from 'react';
import { useDnd } from './useDnd';
import { RecommendationContext } from '@/components/recommendation/RecommendationContext';

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
        {recommendations.map((r: Recommendation) => (
          <DroppableDateList key={r.date} recommendation={r} />
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
