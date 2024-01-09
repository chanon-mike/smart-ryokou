import axios from 'axios';

import type { PlaceDetails } from '@/types/place-details';

interface MapPlaceClientInterface {
  getPlaceData(placeName: string): Promise<PlaceDetails>;
}

export const mapPlaceClient: MapPlaceClientInterface = {
  async getPlaceData(placeName: string): Promise<PlaceDetails> {
    const placeData: PlaceDetails = await axios
      .post(`/api/service/map/place/`, {
        placeName,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });

    return placeData;
  },
};
