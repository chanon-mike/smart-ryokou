import type { ApiContext } from '@/client/apiContext';
import type { Recommendation } from '@/types/recommendation';

export type GetRecommendationInterface = (
  context: ApiContext,
  request: GetRecommendationRequest,
) => Promise<GetRecommendationResponse>;

export interface GetRecommendationRequest {
  place: string;
  date_from: string;
  date_to: string;
  trip_type: string | null;
  trip_pace: string | null;
  budget: string | null;
  interests: string[] | null;
  optional_prompt: string | null;
}

export interface GetRecommendationResponse {
  place: string;
  title: string;
  recommendations: Recommendation[];
}

export interface GetRecommendationServerResponse {
  place: string;
  title: string;
  recommendations: {
    date: string;
    locations: {
      place: string;
      description: string;
    }[];
  }[];
}
