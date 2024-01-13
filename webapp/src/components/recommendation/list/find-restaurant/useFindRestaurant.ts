import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import client from '@/client/client';
import { saveNewSessionData } from '@/libs/helper';
import type Session from '@/server/service/database/session/model';
import type { Location } from '@/types/recommendation';

type Props = {
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
};

export const useFindRestaurant = ({ session, setSession }: Props) => {
  const [findRestaurantOpen, setFindRestaurantOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<Location[]>([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);

  const [allIndex, setAllIndex] = useState<{ recIndex: number; dateIndex: number }>({
    recIndex: 0,
    dateIndex: 0,
  });

  const handleFindRestaurant = async (recIndex: number, dateIndex: number, location: Location) => {
    setFindRestaurantOpen(true);
    setAllIndex({ recIndex, dateIndex });

    if (restaurants.length === 0) {
      setLoadingRestaurants(true);
      const res: Location[] = await client.getRestaurant(
        {
          useMock: false,
          requireAuth: false,
        },
        {
          latitude: location.lat,
          longitude: location.lng,
        },
      );
      setRestaurants(res);
      setLoadingRestaurants(false);
    }

    return;
  };

  const handleCloseDialog = () => {
    setFindRestaurantOpen(false);
    setRestaurants([]);
  };

  const handleSelectRestaurant = (restaurant: Location) => {
    setRestaurants([]);

    setSession((prev: Session) => {
      const newRecommendations = [...prev.recommendations];
      newRecommendations[allIndex.recIndex].locations.splice(allIndex.dateIndex + 1, 0, restaurant);
      return { ...session, recommendations: newRecommendations };
    });
    saveNewSessionData(session);

    setFindRestaurantOpen(false);
    return;
  };

  return {
    findRestaurantOpen,
    restaurants,
    loadingRestaurants,
    handleFindRestaurant,
    handleCloseDialog,
    handleSelectRestaurant,
  };
};
