import type {
  GetRecommendationRequest,
  GetRecommendationResponse,
} from '@/client/api/llm/recommendation/interface';
import createApiMock from '@/client/helper/createApiMock';

const getRecommendationMockCases: ReadonlyArray<{
  request: GetRecommendationRequest;
  response: GetRecommendationResponse;
}> = [
  {
    request: {} as GetRecommendationRequest,
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
    } as GetRecommendationResponse,
  },
];

const getRecommendationMock = createApiMock<GetRecommendationRequest, GetRecommendationResponse>(
  getRecommendationMockCases,
  getRecommendationMockCases[0].response,
);

export default getRecommendationMock;
