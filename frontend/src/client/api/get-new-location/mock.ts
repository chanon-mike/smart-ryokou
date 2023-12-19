import createApiMock from '@/client/helper/createApiMock';
import type { GetNewLocationRequest, GetNewLocationResponse } from './interface';

const getNewLocationMockCases: ReadonlyArray<{
  request: GetNewLocationRequest;
  response: GetNewLocationResponse;
}> = [
  {
    request: {} as GetNewLocationRequest,
    response: {
      locations: [
        {
          name: 'Tokyo Tower',
          description: 'mock',
          photo:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 30,
          lng: 30,
        },
        {
          name: 'Tokyo Skytree',
          description: 'mock',
          photo:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 30,
          lng: 30,
        },
        {
          name: 'Asakusa Temple',
          description: 'mock',
          photo:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 30,
          lng: 30,
        },
        {
          name: 'Harajuku',
          description: 'mock',
          photo:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 30,
          lng: 30,
        },
        {
          name: 'Shibuya Crossing',
          description: 'mock',
          photo:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 30,
          lng: 30,
        },
        {
          name: 'Shinjuku',
          description: 'mock',
          photo:
            'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
          lat: 30,
          lng: 30,
        },
      ],
    } as GetNewLocationResponse,
  },
];

const getNewLocationMock = createApiMock<GetNewLocationRequest, GetNewLocationResponse>(
  getNewLocationMockCases,
  getNewLocationMockCases[0].response,
);

export default getNewLocationMock;
