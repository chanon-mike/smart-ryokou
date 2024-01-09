import axios from 'axios';

import type {
  GetResultInterface,
  GetResultRequest,
  GetResultServerResponse,
} from '@/client/api/get-result/interface';
import getResultMock from '@/client/api/get-result/mock';
import type { ApiContext } from '@/client/apiContext';
import cacheClient from '@/client/service/cache/implement';
import { mapPlaceClient } from '@/client/service/map/place/implement';
import { API_ENDPOINT } from '@/libs/envValues';
import { generateObjectId } from '@/libs/helper';
import type { Location, Recommendation } from '@/types/recommendation';

// eslint-disable-next-line complexity
export const getResult: GetResultInterface = async (
  context: ApiContext,
  request: GetResultRequest,
) => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  if (context.useMock) {
    return getResultMock(request);
  }

  let serverResponse: GetResultServerResponse;

  // TODO: hash instead stringify
  const cacheKey = JSON.stringify(request);
  const cachedResult = await cacheClient.getKey(cacheKey);

  if (cachedResult === null) {
    try {
      serverResponse = (
        await axios.post(`${API_ENDPOINT}/api/recommendation/structured-format`, request)
      ).data;

      cacheClient.setKey(cacheKey, JSON.stringify(serverResponse));
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    serverResponse = JSON.parse(cachedResult);
  }

  const mappedRecommendations = await Promise.all(
    serverResponse.recommendation.map(mapRecommendation),
  );

  return {
    title: serverResponse.title,
    recommendations: mappedRecommendations,
  };
};

const generateLocation = async (activity: {
  place: string;
  description: string;
}): Promise<Location> => {
  const placeData = await mapPlaceClient.getPlaceData(activity.place);

  return {
    id: generateObjectId(),
    placeId: placeData.placeId,
    name: placeData.name,
    description: activity.description,
    rating: placeData.rating,
    userRatingCount: placeData.userRatingCount,
    photo: placeData.photo,
    lat: placeData.location.lat,
    lng: placeData.location.lng,
  };
};

const mapRecommendation = async (recommendation: {
  date: string;
  activities: { place: string; description: string }[];
}): Promise<Recommendation> => {
  const locations = await Promise.all(recommendation.activities.map(generateLocation));

  return {
    date: recommendation.date,
    locations,
  };
};
