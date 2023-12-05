import type { ApiContext } from '@/client/ApiContext';
import type {
  GetNewLocationInterface,
  GetNewLocationRequest,
  GetNewLocationServerResponse,
} from './interface';
import axios from 'axios';
import type { Location } from '@/types/recommendation';
import cacheClient from '@/client/service/cache/implement';
import { API_ENDPOINT } from '@/libs/envValues';
import getNewLocationMock from './mock';
import { generateObjectId } from '@/libs/helper';
import mapPlaceService from '@/service/map/place/service';

// eslint-disable-next-line complexity
const getLocation: GetNewLocationInterface = async (
  context: ApiContext,
  request: GetNewLocationRequest,
) => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  if (context.useMock) {
    return getNewLocationMock(request);
  }

  let serverResponse: GetNewLocationServerResponse;

  // TODO: hash instead stringify
  const cacheKey = JSON.stringify(request);
  const cachedResult = await cacheClient.getKey(cacheKey);
  console.log('request', request);

  if (cachedResult === null) {
    try {
      serverResponse = (await axios.post(`${API_ENDPOINT}/api/recommendation/prompt`, request))
        .data;

      cacheClient.setKey(cacheKey, JSON.stringify(serverResponse));
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    serverResponse = JSON.parse(cachedResult);
  }

  const locationPromises = serverResponse.recommendations.map(mapLocation);
  const locationResults = await Promise.all(locationPromises);
  const locations: Location[] = locationResults.filter(
    (location) => location !== undefined,
  ) as Location[];

  console.log('locations', locations);

  return { locations };
};

// Data Example: {'recommendations': [{'place': 'Kanazawa', 'description': 'Kanazawa is known for its rich history and traditional arts. It is home to several museums, including the Ishikawa Prefectural Museum of Art and the 21st Century Museum of Contemporary Art.'}, {'place': 'Hakone', 'description': 'Hakone is a popular tourist destination known for its hot springs and natural beauty. It is home to the Hakone Open-Air Museum, which features a large collection of outdoor sculptures.'}, {'place': 'Nikko', 'description': 'Nikko is a historic city famous for its shrines and temples. It is home to the Nikko Toshogu Shrine, a UNESCO World Heritage site, and the Nikko Tamozawa Imperial Villa Memorial Park.'}]}
// Make an adapter to convert the server response to the client response
const mapLocation = async (recommendation: {
  place: string;
  description: string;
}): Promise<Location | undefined> => {
  const placeData = await mapPlaceService.getPlaceData(recommendation.place);

  return {
    id: generateObjectId(),
    name: placeData.name,
    description: recommendation.description,
    address: placeData.address,
    rating: placeData.rating,
    userRatingCount: placeData.userRatingCount,
    photo: placeData.photo,
    lat: placeData.location.lat,
    lng: placeData.location.lng,
  };
};

export default getLocation;
