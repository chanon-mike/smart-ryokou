import type { MapRouteServiceInterface } from './interface';
import type { DistanceMatrix } from '@/types/distance';

class MapRouteService implements MapRouteServiceInterface {
  async getDistanceMatrix(
    originPlaceId: string,
    destinationPlaceId: string,
  ): Promise<DistanceMatrix> {
    const params = {
      destinationPlaceId,
      originPlaceId,
    };
    const query = new URLSearchParams(params);

    const distanceMatrixData = await fetch(encodeURI(`/api/service/map/route/distance?${query}`), {
      method: 'GET',
    }).then((response) => response.json());

    return distanceMatrixData;
  }
}

const mapRouteService = new MapRouteService();

export default mapRouteService;
