import type { ApiContext } from '@/client/ApiContext';
import type {
  GetRestaurantRequest,
  GetRestaurantResponse,
} from '@/client/api/get-restaurant/interface';
import mapPlaceService from '@/service/map/place/service';

export const getRestaurant = async (context: ApiContext, request: GetRestaurantRequest) => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  try {
    const serverResponse: GetRestaurantResponse = await mapPlaceService.getRestaurantData(
      request.latitude,
      request.longitude,
    );

    return serverResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
