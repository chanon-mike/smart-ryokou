import type { MapRouteServiceInterface } from './interface';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import type { DistanceMatrix } from '@/types/distance';

class MapRouteService implements MapRouteServiceInterface {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getDistanceMatrix(
    originPlaceId: string,
    destinationPlaceId: string,
  ): Promise<DistanceMatrix> {
    const params = {
      key: this.apiKey,
      destination: `place_id:${destinationPlaceId}`,
      origin: `place_id:${originPlaceId}`,
    };
    const query = new URLSearchParams(params);

    const placeData = await fetch(encodeURI(`/api/service/map/route/distance?${query}`), {
      method: 'GET',
    }).then((response) => response.json());

    return placeData;
  }
}

const mapRouteService = new MapRouteService(GOOGLE_MAPS_API_KEY);

export default mapRouteService;
