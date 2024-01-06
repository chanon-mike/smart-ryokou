import axios from 'axios';

import type { ApiContext } from '@/client/ApiContext';

import type { GetDistanceMatrixRequest, GetDistanceMatrixResponse } from './interface';

export const getDistanceMatrix = async (context: ApiContext, request: GetDistanceMatrixRequest) => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  try {
    const response = await axios.get('/api/service/map/route/distance', {
      params: {
        destinationPlaceId: request.destinationPlaceId,
        originPlaceId: request.originPlaceId,
      },
    });
    const distanceMatrixData: GetDistanceMatrixResponse = response.data;

    return distanceMatrixData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
