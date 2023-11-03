import type { ApiContext } from '@/client/ApiContext';
import type {
  GetNewLocationInterface,
  GetNewLocationRequest,
  GetNewLocationResponse,
  GetNewLocationServerResponse,
} from './interface';
import axios from 'axios';
import type { Location } from '@/types/recommendation';
import getLocationData from '@/client/helper/getLocationData';
import cacheClient from '@/client/service/cache/implement';
import { API_ENDPOINT, CX, GOOGLE_MAPS_API_KEY, GOOGLE_SEARCH_API_KEY } from '@/libs/envValues';
import getNewLocationMock from './mock';
import { getImageData } from '@/client/helper/getImageData';

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

  if (cachedResult === null) {
    try {
      console.log('request', request);
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

  return adapter(serverResponse);
};

// Data Example: {'recommendations': [{'place': 'Kanazawa', 'description': 'Kanazawa is known for its rich history and traditional arts. It is home to several museums, including the Ishikawa Prefectural Museum of Art and the 21st Century Museum of Contemporary Art.'}, {'place': 'Hakone', 'description': 'Hakone is a popular tourist destination known for its hot springs and natural beauty. It is home to the Hakone Open-Air Museum, which features a large collection of outdoor sculptures.'}, {'place': 'Nikko', 'description': 'Nikko is a historic city famous for its shrines and temples. It is home to the Nikko Toshogu Shrine, a UNESCO World Heritage site, and the Nikko Tamozawa Imperial Villa Memorial Park.'}]}
// Make an adapter to convert the server response to the client response
const adapter = async (
  serverResponse: GetNewLocationServerResponse,
): Promise<GetNewLocationResponse> => {
  console.log('serverResponse', serverResponse);
  const locations: Location[] = [];

  await Promise.all(
    serverResponse.recommendations.map(
      async (recommendation: { place: string; description: string }) => {
        const location = await getLocationData(recommendation.place, GOOGLE_MAPS_API_KEY);
        const imageUrl = await getImageData(recommendation.place, GOOGLE_SEARCH_API_KEY, CX);

        locations.push({
          name: recommendation.place,
          description: recommendation.description,
          imageUrl:
            imageUrl ||
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: location?.lat,
          lng: location?.lng,
        } as Location);
      },
    ),
  );

  return {
    locations,
  };
};

export default getLocation;
