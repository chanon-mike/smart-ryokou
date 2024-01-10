import axios from 'axios';

import type { DistanceMatrix } from '@/types/distance';

interface MapRouteClientInterface {
  getDistanceMatrixData(destinationPlaceId: string, originPlaceId: string): Promise<DistanceMatrix>;
}

export const mapRouteClient: MapRouteClientInterface = {
  async getDistanceMatrixData(
    destinationPlaceId: string,
    originPlaceId: string,
  ): Promise<DistanceMatrix> {
    const distanceMatrixData: DistanceMatrix = await axios
      .get('/api/service/map/route/distance', {
        params: {
          destinationPlaceId,
          originPlaceId,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });

    return distanceMatrixData;
  },
};
