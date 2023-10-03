// TODO: move this to api layer

import axios from 'axios';

const getLocationData = async (placeName: string, apiKey: string) => {
  try {
    const response = (
      await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${apiKey}`,
      )
    ).data;
    return response.geometry.location as { lat: number; lng: number };
  } catch (error) {
    console.log(error);
  }
};

export default getLocationData;
