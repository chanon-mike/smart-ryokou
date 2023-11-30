import SessionClient from '@/client/service/session/implement';
import type Session from '@/service/database/session/model';
import type { DragStartEvent, DragOverEvent, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>;
  activeContainerIndex: number | null;
  setActiveContainerIndex: Dispatch<SetStateAction<number | null>>;
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
};

export const useDnd = ({
  session,
  setSession,
  setActiveId,
  activeContainerIndex,
  setActiveContainerIndex,
}: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeDateContainerIndex = session.recommendations.findIndex((r) =>
      r.locations.some((loc) => loc.name === active.id),
    );

    setActiveId(active.id);
    setActiveContainerIndex(activeDateContainerIndex);
    // console.log('Drag started:', event);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveContainerIndex(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (over === null) {
      return;
    }

    const overContainerIndex = session.recommendations.findIndex((r) =>
      r.locations.some((loc) => loc.name === over.id),
    );

    if (activeContainerIndex === null || activeContainerIndex === overContainerIndex) {
      return;
    }

    // If dragging to a different Container
    setSession((prev) => {
      const next = [...prev.recommendations];
      const activeContainer = next[activeContainerIndex];

      if (!activeContainer) {
        return prev;
      }

      const [activeItem] = activeContainer.locations.splice(
        activeContainer.locations.findIndex((loc) => loc.name === active.id),
        1,
      );
      next[overContainerIndex]?.locations.push(activeItem); // This places the item at the end of the target Container

      return {
        ...prev,
        recommendations: next,
      };
    });

    saveNewSessionData(session);

    setActiveContainerIndex(overContainerIndex); // Update the active Container index for subsequent drag over events
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveId(null);
      setActiveContainerIndex(null);
      return;
    }

    setSession((prev) => {
      const newRecommendation = [...prev.recommendations];
      const activeContainer = newRecommendation.find((r) =>
        r.locations.some((loc) => loc.name === active.id),
      );
      const overContainer = newRecommendation.find((r) =>
        r.locations.some((loc) => loc.name === over.id),
      );

      if (!activeContainer || !overContainer) return prev;

      // Find the source and target index within their respective groups
      const activeIndex = active.data.current?.sortable.index;
      const overIndex = over.data.current?.sortable.index;

      // Remove the item from the source and add it to the target
      const [itemToMove] = activeContainer.locations.splice(activeIndex, 1);
      overContainer.locations.splice(overIndex, 0, itemToMove);

      return {
        ...prev,
        recommendations: newRecommendation,
      };
    });

    saveNewSessionData(session);

    setActiveId(null);
    setActiveContainerIndex(null);
    // console.log('Drag ended:', event);
  };

  return {
    sensors,
    handleDragStart,
    handleDragCancel,
    handleDragOver,
    handleDragEnd,
  };
};

const saveNewSessionData = (session: Session) => {
  const client = new SessionClient();
  client.update(session);
};
