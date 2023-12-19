import type { PlaceDetails } from '@/types/place-details';
import type { MapPlaceServiceInterface } from './interface';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import type { Location } from '@/types/recommendation';

class MapPlaceService implements MapPlaceServiceInterface {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getPlaceData(placeName: string): Promise<PlaceDetails> {
    const placeData = await fetch(encodeURI(`/api/service/map/place/`), {
      method: 'POST',
      body: JSON.stringify({
        placeName,
        apiKey: this.apiKey,
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
        apiKey: this.apiKey,
      }),
    }).then((response) => response.json());
    console.log(restaurantData);

    return restaurantData;
  }
}

const mapPlaceService = new MapPlaceService(GOOGLE_MAPS_API_KEY);

export default mapPlaceService;
