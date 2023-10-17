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
import MapConfigs from '@/libs/MapConfigs';
import cacheClient from '@/client/service/cache/implement';

// eslint-disable-next-line complexity
const getResult: GetResultInterface = async (context: ApiContext, request: GetResultRequest) => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  if (context.useMock) {
    return getResultMock(request);
  }

  const BACKEND_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:8000';

  let serverResponse: GetResultServerResponse;

  // TODO: hash instead stringify
  const cacheKey = JSON.stringify(request);
  const cachedResult = cacheClient.getKey(cacheKey);

  if (cachedResult === null) {
    serverResponse = JSON.parse(cachedResult);
  } else {
    try {
      serverResponse = (
        await axios.post(`${BACKEND_ENDPOINT}/api/recommendation/structured-format`, request)
      ).data;

      cacheClient.setKey(cacheKey, JSON.stringify(serverResponse));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return adapter(serverResponse);
};

// TODO: Refactor
const adapter = async (serverResponse: GetResultServerResponse) => {
  return {
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
                const { API_KEY } = MapConfigs();
                const data = await getLocationData(a.place, API_KEY);
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
