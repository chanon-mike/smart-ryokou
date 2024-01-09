import type { ApiContext } from '@/client/apiContext';
import { mapRouteClient } from '@/client/service/map/route/implement';

import type { GetDistanceMatrixRequest, GetDistanceMatrixResponse } from './interface';

export const getDistanceMatrix = async (
  context: ApiContext,
  request: GetDistanceMatrixRequest,
): Promise<GetDistanceMatrixResponse> => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  try {
    const distanceMatrixData = await mapRouteClient.getDistanceMatrixData(
      request.destinationPlaceId,
      request.originPlaceId,
    );

    return distanceMatrixData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
