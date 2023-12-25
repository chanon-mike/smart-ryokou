import type { DistanceMatrix } from '@/types/distance';

export interface MapRouteServiceInterface {
  getDistanceMatrix: (originPlaceId: string, destinationPlaceId: string) => Promise<DistanceMatrix>;
}
