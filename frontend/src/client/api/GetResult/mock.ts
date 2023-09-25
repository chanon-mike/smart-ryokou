import createApiMock from '@/client/helper/createApiMock';
import type { GetResultRequest, GetResultResponse } from './interface';

const defaultResponse: GetResultResponse = {
  locations: [],
};

const getResultMockCases: ReadonlyArray<{
  request: GetResultRequest;
  response: GetResultResponse;
}> = [
  {
    request: {} as GetResultRequest,
    response: {
      locations: [
        {
          name: 'Tokyo',
          description: 'The capital city of Japan',
          imageUrl:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 35.682839,
          lng: 139.759455,
        },
        {
          name: 'Osaka',
          description: 'Known for its vibrant nightlife and street food',
          imageUrl:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 34.693737,
          lng: 135.502165,
        },
        {
          name: 'Kyoto',
          description: 'Famous for its temples and traditional culture',
          imageUrl:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 35.011564,
          lng: 135.768149,
        },
        {
          name: 'Hokkaido',
          description: "Japan's northernmost island with beautiful landscapes",
          imageUrl:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 43.220327,
          lng: 142.863474,
        },
        {
          name: 'Fukuoka',
          description: 'Known for its rich history and delicious food',
          imageUrl:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 33.590355,
          lng: 130.401716,
        },
      ],
    } as GetResultResponse,
  },
];

const getResultMock = createApiMock<GetResultRequest, GetResultResponse>(
  getResultMockCases,
  defaultResponse,
);

export default getResultMock;
