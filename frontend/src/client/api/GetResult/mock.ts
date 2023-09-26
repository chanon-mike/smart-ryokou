import createApiMock from '@/client/helper/createApiMock';
import type { GetResultRequest, GetResultResponse } from './interface';

const defaultResponse: GetResultResponse = {
  recommendations: [],
};

const getResultMockCases: ReadonlyArray<{
  request: GetResultRequest;
  response: GetResultResponse;
}> = [
  {
    request: {} as GetResultRequest,
    response: {
      recommendations: [
        {
          date: 'this is a date 1',
          locations: [
            {
              name: 'tokyo',
              description: 'tokyo',
              imageUrl:
                'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
              lat: 30,
              lng: 30,
            },
            {
              name: 'tokyo',
              description: 'tokyo',
              imageUrl:
                'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
              lat: 30,
              lng: 30,
            },
          ],
        },
        {
          date: 'this is a date 2',
          locations: [
            {
              name: 'tokyo',
              description: 'tokyo',
              imageUrl:
                'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
              lat: 30,
              lng: 30,
            },
          ],
        },
        {
          date: 'this is a date 3',
          locations: [
            {
              name: 'tokyo',
              description: 'tokyo',
              imageUrl:
                'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
              lat: 30,
              lng: 30,
            },
          ],
        },
        {
          date: 'this is a date 4',
          locations: [
            {
              name: 'tokyo',
              description: 'tokyo',
              imageUrl:
                'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
              lat: 30,
              lng: 30,
            },
          ],
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
