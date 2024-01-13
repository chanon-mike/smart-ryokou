import axios from 'axios';

import type { Location } from '@/types/recommendation';

interface MapPlaceRestaurantClientInterface {
  getRestaurantData(latitude: number, longitude: number): Promise<Location[]>;
}

export const mapPlaceRestaurantClient: MapPlaceRestaurantClientInterface = {
  async getRestaurantData(latitude: number, longitude: number): Promise<Location[]> {
    const restaurantData: Location[] = await axios
      .post('/api/service/map/place/restaurant', {
        latitude,
        longitude,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });

    return restaurantData;
  },
};
