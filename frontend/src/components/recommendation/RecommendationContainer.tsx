'use client';

import Box from '@mui/material/Box';
import type { Recommendation } from '@/types/recommendation';
import DroppableDateList from './DroppableDateList';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { DndContext, closestCorners, DragOverlay } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableLocationCard from './SortableLocationCard';
import type { Dispatch, SetStateAction, FC } from 'react';
import { useState } from 'react';
import { useDnd } from './useDnd';

interface RecommendationContainerProps {
  recommendations: Recommendation[];
  setRecommendations: Dispatch<SetStateAction<Recommendation[]>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  activeDate: string;
  setActiveDate: Dispatch<SetStateAction<string>>;
  setMapCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

const RecommendationContainer: FC<RecommendationContainerProps> = ({
  recommendations,
  setRecommendations,
  activeStep,
  setActiveStep,
  activeDate,
  setActiveDate,
  setMapCenter,
}) => {
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
      <Box style={{ maxWidth: '400px', height: '70vh', overflowY: 'auto' }}>
        {recommendations.map((r: Recommendation) => (
          <DroppableDateList
            key={r.date}
            recommendation={r}
            setRecommendations={setRecommendations}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            setMapCenter={setMapCenter}
          />
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
