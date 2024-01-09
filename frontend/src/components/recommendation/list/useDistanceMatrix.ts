import { useEffect, useState } from 'react';

import client from '@/client/client';
import { useSnackbar } from '@/components/common/snackbar/SnackbarContext';
import type { DistanceMatrix } from '@/types/distance';
import type { Recommendation } from '@/types/recommendation';

export const useDistanceMatrix = (recommendation: Recommendation) => {
  const [distanceMatrix, setDistanceMatrix] = useState<DistanceMatrix[]>([]);
  const [isLoadingDistanceMatrix, setIsLoadingDistanceMatrix] = useState<boolean>(false);
  const { openSnackbar } = useSnackbar();

  const stringifiedRecommendation = JSON.stringify(recommendation);

  useEffect(() => {
    const fetchDistanceMatrix = async () => {
      setIsLoadingDistanceMatrix(true);
      const distanceMatrixPromises = [];

      // Fetches distance matrix for each pair of locations in the recommendation.
      for (let i = 0; i < recommendation.locations.length - 1; i++) {
        if (!recommendation.locations[i].placeId) {
          return;
        }

        const promise = client.getDistanceMatrix(
          {
            useMock: false,
            requireAuth: false,
          },
          {
            originPlaceId: recommendation.locations[i].placeId,
            destinationPlaceId: recommendation.locations[i + 1].placeId,
          },
        );
        distanceMatrixPromises.push(promise);
      }

      // Sets the distance matrix state after all the promises are resolved.
      Promise.all(distanceMatrixPromises)
        .then((responses) => setDistanceMatrix(responses))
        .catch((error) => {
          console.error('Error fetching distance matrix:', error);
          if (error instanceof Error) {
            openSnackbar(error.message, 'error');
          }
        })
        .finally(() => setIsLoadingDistanceMatrix(false));
    };

    fetchDistanceMatrix();
    // useEffect wont' see the changes if you changing properties of the object but not the object itself
    // So we need to stringify the object to make it work
  }, [openSnackbar, recommendation.locations, stringifiedRecommendation]);

  return { distanceMatrix, isLoadingDistanceMatrix };
};
