import axios from 'axios';

import cacheService from '@/server/service/cache/service';
import type { MapRouteServiceInterface } from '@/server/service/map/route/interface';
import type { DistanceMatrix } from '@/types/distance';

class MapRouteService implements MapRouteServiceInterface {
  async getDistanceMatrixData(
    originPlaceId: string,
    destinationPlaceId: string,
    apiKey: string,
  ): Promise<DistanceMatrix> {
    const cacheKey = `distance:origin${originPlaceId},destination${destinationPlaceId}`;
    const cachedResult = await cacheService.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    const response = await this.getDistanceMatrixFromGoogleMaps(
      originPlaceId,
      destinationPlaceId,
      apiKey,
    );

    try {
      // Error if place without calculation result (e.g. Shiretoko Peninsula -> Asahikawa)
      const elements = response.rows[0].elements?.[0];
      if (elements === undefined) {
        throw new Error('Google Maps API returned undefined distance');
      }

      const data: DistanceMatrix = {
        distance: {
          text: elements.distance.text,
          value: elements.distance.value,
        },
        duration: {
          text: elements.duration.text,
          value: elements.duration.value,
        },
      };
      await cacheService.setKey(cacheKey, JSON.stringify(data));

      return data;
    } catch (error) {
      throw new Error('Invalid response from Google Maps API');
    }
  }

  private async getDistanceMatrixFromGoogleMaps(
    originPlaceId: string,
    destinationPlaceId: string,
    apiKey: string,
  ): Promise<GoogleRouteDistanceMatrixResponse> {
    try {
      const response: GoogleRouteDistanceMatrixResponse = (
        await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
          params: {
            key: apiKey,
            destinations: `place_id:${destinationPlaceId}`,
            origins: `place_id:${originPlaceId}`,
            language: 'ja',
          },
        })
      ).data;

      return response;
    } catch (error) {
      throw new Error(`An unexpected error occurred while fetching distance matrix: ${error}`);
    }
  }
}

const mapRouteService = new MapRouteService();

export default mapRouteService;

type GoogleRouteDistanceMatrixResponse = {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: [
    {
      elements?: [DistanceMatrix];
    },
  ];
  error_message?: string;
  status: string;
};
