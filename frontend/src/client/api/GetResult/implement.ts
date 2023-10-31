import type { ApiContext } from '@/client/ApiContext';
import getResultMock from './mock';
import type {
  GetResultInterface,
  GetResultRequest,
  GetResultResponse,
  GetResultServerResponse,
} from './interface';
import axios from 'axios';
import type { Recommendation, Location } from '@/types/recommendation';
import getLocationData from '@/client/helper/getLocationData';
import cacheClient from '@/client/service/cache/implement';
import { API_ENDPOINT, GOOGLE_MAPS_API_KEY } from '@/libs/envValues';

// eslint-disable-next-line complexity
const getResult: GetResultInterface = async (context: ApiContext, request: GetResultRequest) => {
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

  return adapter(serverResponse);
};

// TODO: Refactor
const adapter = async (serverResponse: GetResultServerResponse) => {
  return {
    title: serverResponse.title,
    recommendations: await Promise.all(
      serverResponse.recommendation.map(
        async (r: {
          date: string;
          activities: {
            place: string;
            description: string;
          }[];
        }) => {
          return {
            date: r.date,
            locations: await Promise.all(
              r.activities.map(async (a: { place: string; description: string }) => {
                const data = await getLocationData(a.place, GOOGLE_MAPS_API_KEY);
                return {
                  name: a.place,
                  description: a.description,
                  imageUrl:
                    'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
                  lat: data?.lat,
                  lng: data?.lng,
                } as Location;
              }),
            ),
          } as Recommendation;
        },
      ),
    ),
  } as GetResultResponse;
};

export default getResult;
