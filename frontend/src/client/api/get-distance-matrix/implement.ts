import type { ApiContext } from '@/client/ApiContext';
import mapRouteService from '@/service/map/route/service';

import type { GetDistanceMatrixRequest, GetDistanceMatrixResponse } from './interface';

export const getDistanceMatrix = async (context: ApiContext, request: GetDistanceMatrixRequest) => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  try {
    const response: GetDistanceMatrixResponse = await mapRouteService.getDistanceMatrix(
      request.originPlaceId,
      request.destinationPlaceId,
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
