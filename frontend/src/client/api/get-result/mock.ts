import createApiMock from '@/client/helper/createApiMock';
import type { GetResultRequest, GetResultResponse } from './interface';

const getResultMockCases: ReadonlyArray<{
  request: GetResultRequest;
  response: GetResultResponse;
}> = [
  {
    request: {} as GetResultRequest,
    response: {
      recommendations: [
        {
          date: '11月1日',
          locations: [
            {
              name: '東京',
              description: 'mock',
              photo:
                'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
              lat: 30,
              lng: 30,
            },
            {
              name: '大阪',
              description: 'mock',
              photo:
                'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
              lat: 30,
              lng: 30,
            },
            {
              name: '広島',
              description: 'mock',
              photo:
                'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
              lat: 30,
              lng: 30,
            },
          ],
        },
        {
          date: '11日2日',
          locations: [
            {
              name: '京都',
              description: 'mock',
              photo:
                'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
              lat: 30,
              lng: 30,
            },
            {
              name: '奈良',
              description: 'mock',
              photo:
                'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
              lat: 30,
              lng: 30,
            },
          ],
        },
        {
          date: '11月3日',
          locations: [
            {
              name: '名古屋',
              description: 'mock',
              photo:
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
  getResultMockCases[0].response,
);

export default getResultMock;
