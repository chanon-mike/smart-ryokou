'use client';

import Box from '@mui/material/Box';
import type { Recommendation } from '@/types/recommendation';
import LocationListingsByDate from './LocationListingsByDate';
import type { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
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
import LocationCard from './LocationCard';
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setActiveColumnIndex(null);
      return;
    }

    if (active.id !== over.id) {
      setRecommendations((prevRecommendations) => {
        // Find the source and target dates (groups)
        const newRecommendation = [...prevRecommendations];
        const sourceDate = newRecommendation.find((r) =>
          r.locations.some((loc) => loc.name === active.id),
        );
        const targetDate = newRecommendation.find((r) =>
          r.locations.some((loc) => loc.name === over.id),
        );

        if (!sourceDate || !targetDate) return prevRecommendations;

        // Find the source and target index within their respective groups
        const sourceIndex = sourceDate.locations.findIndex((loc) => loc.name === active.id);
        const targetIndex = targetDate.locations.findIndex((loc) => loc.name === over.id);

        // Remove the item from the source and add it to the target
        const [itemToMove] = sourceDate.locations.splice(sourceIndex, 1);
        targetDate.locations.splice(targetIndex, 0, itemToMove);

        return newRecommendation;
      });
    }
    setActiveId(null);
    setActiveColumnIndex(null);
    console.log('Drag ended:', event);
  };

  console.log('active id:', activeId);
  console.log('active column:', activeColumnIndex);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      modifiers={[restrictToVerticalAxis]}
    >
      <Box style={{ maxWidth: '400px', height: '70vh', overflowY: 'auto' }}>
        {recommendations.map((r: Recommendation) => (
          <LocationListingsByDate
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
            <LocationCard
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
