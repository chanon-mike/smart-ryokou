import type { MapPlaceServiceInterface } from '@/service/map/place/interface';
import type { PlaceDetails } from '@/types/place-details';
import type { Location } from '@/types/recommendation';

class MapPlaceService implements MapPlaceServiceInterface {
  async getPlaceData(placeName: string): Promise<PlaceDetails> {
    const placeData = await fetch(encodeURI(`/api/service/map/place/`), {
      method: 'POST',
      body: JSON.stringify({
        placeName,
      }),
    }).then((response) => response.json());

    return placeData;
  }

  async getRestaurantData(latitude: number, longitude: number): Promise<Location[]> {
    const restaurantData = await fetch(encodeURI(`/api/service/map/place/restaurant`), {
      method: 'POST',
      body: JSON.stringify({
        latitude,
        longitude,
      }),
    }).then((response) => response.json());
    console.log(restaurantData);

    return restaurantData;
  }
}

const mapPlaceService = new MapPlaceService();

export default mapPlaceService;
