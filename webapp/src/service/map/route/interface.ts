import type { DistanceMatrix } from '@/types/distance';

export interface MapRouteServiceInterface {
  getDistanceMatrixData(
    originPlaceId: string,
    destinationPlaceId: string,
    apiKey: string,
  ): Promise<DistanceMatrix>;
}
