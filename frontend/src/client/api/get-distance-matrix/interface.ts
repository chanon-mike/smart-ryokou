import type { ApiContext } from '@/client/apiContext';
import type { DistanceMatrix } from '@/types/distance';

export type GetDistanceMatrixInterface = (
  context: ApiContext,
  request: GetDistanceMatrixRequest,
) => Promise<GetDistanceMatrixResponse>;

export interface GetDistanceMatrixRequest {
  originPlaceId: string;
  destinationPlaceId: string;
}

export type GetDistanceMatrixResponse = DistanceMatrix;
