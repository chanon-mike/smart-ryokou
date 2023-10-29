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
  trip_type: string | null;
  trip_pace: string | null;
  budget: string | null;
  interests: string[] | null;
}

export interface GetResultResponse {
  recommendations: Recommendation[];
}

export interface GetResultServerResponse {
  recommendation: {
    date: string;
    activities: {
      place: string;
      description: string;
    }[];
  }[];
}
