import type { Recommendation } from '@/types/recommendation';
import type { ApiContext } from './../../ApiContext';

export type GetResultInterface = (
  context: ApiContext,
  request: GetResultRequest,
) => Promise<GetResultResponse>;

export interface GetResultRequest {
  place: string;
  date_from: string;
  date_to: string;
  people_num: number;
  budget: string;
  trip_pace: string;
  interests: string[];
  trip_type: string;
}

export interface GetResultResponse {
  title: string;
  recommendations: Recommendation[];
}

export interface GetResultServerResponse {
  title: string;
  recommendation: {
    date: string;
    activities: {
      place: string;
      description: string;
    }[];
  }[];
}
