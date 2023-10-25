'use client';

import Box from '@mui/material/Box';
import type { Recommendation } from '@/types/recommendation';
import DroppableDateList from './DroppableDateList';
import type { DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableLocationCard from './SortableLocationCard';
import type { Dispatch, SetStateAction, FC } from 'react';
import { useState } from 'react';

interface LocationListingsProps {
  recommendations: Recommendation[];
  setRecommendations: Dispatch<SetStateAction<Recommendation[]>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  activeDate: string;
  setActiveDate: Dispatch<SetStateAction<string>>;
  setMapCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

const LocationListings: FC<LocationListingsProps> = ({
  recommendations,
  setRecommendations,
  activeStep,
  setActiveStep,
  activeDate,
  setActiveDate,
  setMapCenter,
}) => {
  const [activeColumnIndex, setActiveColumnIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeDateColumnIndex = recommendations.findIndex((r) =>
      r.locations.some((loc) => loc.name === active.id),
    );

    setActiveId(active.id);
    setActiveColumnIndex(activeDateColumnIndex);
    console.log('Drag started:', event);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveColumnIndex(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const overColumnIndex = recommendations.findIndex((r) =>
      r.locations.some((loc) => loc.name === over?.id),
    );

    if (!over || activeColumnIndex === null || activeColumnIndex === overColumnIndex) {
      return;
    }

    // If dragging to a different column
    setRecommendations((prev) => {
      const next = [...prev];
      const [activeItem] = next[activeColumnIndex].locations.splice(
        next[activeColumnIndex].locations.findIndex((loc) => loc.name === active.id),
        1,
      );
      next[overColumnIndex].locations.push(activeItem); // This places the item at the end of the target column
      return next;
    });
    setActiveColumnIndex(overColumnIndex); // Update the active column index for subsequent drag over events
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveId(null);
      setActiveColumnIndex(null);
      return;
    }

    setRecommendations((prev) => {
      // Find the source and target dates (groups)
      const newRecommendation = [...prev];
      const activeColumn = newRecommendation.find((r) =>
        r.locations.some((loc) => loc.name === active.id),
      );
      const overColumn = newRecommendation.find((r) =>
        r.locations.some((loc) => loc.name === over.id),
      );

      if (!activeColumn || !overColumn) return prev;

      // Find the source and target index within their respective groups
      const activeIndex = active.data.current?.sortable.index;
      const overIndex = over.data.current?.sortable.index;

      // Remove the item from the source and add it to the target
      const [itemToMove] = activeColumn.locations.splice(activeIndex, 1);
      overColumn.locations.splice(overIndex, 0, itemToMove);

      return newRecommendation;
    });

    setActiveId(null);
    setActiveColumnIndex(null);
    console.log('Drag ended:', event);
  };

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
          {activeId !== null && activeColumnIndex !== null ? (
            <SortableLocationCard
              step={
                recommendations[activeColumnIndex].locations.filter((r) => r.name === activeId)[0]
              }
            />
          ) : null}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default LocationListings;
