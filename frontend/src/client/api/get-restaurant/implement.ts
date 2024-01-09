import type {
  GetRestaurantRequest,
  GetRestaurantResponse,
} from '@/client/api/get-restaurant/interface';
import type { ApiContext } from '@/client/apiContext';
import { mapPlaceRestaurantClient } from '@/client/service/map/place/restaurant/implement';

export const getRestaurant = async (
  context: ApiContext,
  request: GetRestaurantRequest,
): Promise<GetRestaurantResponse> => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  try {
    const restaurantData = await mapPlaceRestaurantClient.getRestaurantData(
      request.latitude,
      request.longitude,
    );

    return restaurantData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
