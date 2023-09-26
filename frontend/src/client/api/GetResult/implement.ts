import type { ApiContext } from '@/client/ApiContext';
import getResultMock from './mock';
import type {
  GetResultInterface,
  GetResultRequest,
  GetResultResponse,
  GetResultServerResponse,
} from './interface';
import type { Location } from '@/types/Location';
import axios from 'axios';
const getResult: GetResultInterface = async (context: ApiContext, request: GetResultRequest) => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  if (context.useMock) {
    return getResultMock(request);
  }

  let serverResponse: GetResultServerResponse;
  console.log('loading...');
  try {
    serverResponse = (
      await axios.post('http://localhost:8000/api/recommendation/structured-format', {
        place: 'string',
        date_from: 'string',
        date_to: 'string',
        people_num: 1,
        budget: 'low',
        trip_pace: 'relaxed',
        interests: ['food'],
        trip_type: 'solo',
      })
    ).data;
    console.log('why ??');
    console.log(serverResponse);
  } catch (error) {
    console.log('done ??');
    throw error;
  }

  return adapter(serverResponse);
};

const adapter = (serverResponse: GetResultServerResponse) => {
  const locations: Location[] = [];

  for (const recommendation of serverResponse.recommendation) {
    for (const activity of recommendation.activities) {
      locations.push({
        name: activity.place,
        description: activity.description,
        imageUrl:
          'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
        lat: 35.682839,
        lng: 139.759455,
      } as Location);
    }
  }

  return { locations } as GetResultResponse;
};

export default getResult;
