'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import type { Recommendation } from '@/types/recommendation';
import LocationListingsByDate from './LocationListingsByDate';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface LocationListingsProps {
  recommendations: Recommendation[];
  setRecommendations: React.Dispatch<React.SetStateAction<Recommendation[]>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeDate: string;
  setActiveDate: React.Dispatch<React.SetStateAction<string>>;
  setMapCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}

const LocationListings: React.FC<LocationListingsProps> = ({
  recommendations,
  setRecommendations,
  activeStep,
  setActiveStep,
  activeDate,
  setActiveDate,
  setMapCenter,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    // active is the item being dragged, over is the item being dragged over
    const { active, over } = event;

    if (over && active.id !== over.id) {
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
    console.log('Drag ended:', event);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => console.log('Drag started:', event)}
      onDragOver={(event) => console.log('Drag over:', event)}
      onDragCancel={(event) => console.log('Drag canceled:', event)}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={recommendations.flatMap((r) => r.locations.map((loc) => loc.name))}
        strategy={verticalListSortingStrategy}
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
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default LocationListings;
