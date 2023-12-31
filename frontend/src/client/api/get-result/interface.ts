import type { ApiContext } from '@/client/apiContext';
import type { Recommendation } from '@/types/recommendation';

export type GetResultInterface = (
  context: ApiContext,
  request: GetResultRequest,
) => Promise<GetResultResponse>;

export interface GetResultRequest {
  place: string;
  date_from: string;
  date_to: string;
  // people_num: number;
  trip_type: string | null;
  trip_pace: string | null;
  budget: string | null;
  interests: string[] | null;
  optional_prompt: string | null;
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
