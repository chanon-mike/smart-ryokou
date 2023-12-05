import type { PlaceDetails } from '@/types/place-details';
import type { MapPlaceServiceInterface } from './interface';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';

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
}

const mapPlaceService = new MapPlaceService(GOOGLE_MAPS_API_KEY);

export default mapPlaceService;
