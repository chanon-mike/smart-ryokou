// TODO: move this to api layer

import cacheClient from '@/client/service/cache/implement';
import axios from 'axios';

const getLocationData = async (placeName: string, apiKey: string) => {
  try {
    // Cache location data
    const cacheKey = `location:${placeName}`;
    const cachedResult = await cacheClient.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    // If not cached, fetch from google maps api
    const response = (
      await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${apiKey}`,
      )
    ).data;
    const locationData: { lat: number; lng: number } = response.results[0].geometry.location;

    cacheClient.setKey(cacheKey, JSON.stringify(locationData));

    return locationData;
  } catch (error) {
    throw new Error('An unexpected error occurred while fetching location data');
  }
};

export default getLocationData;
