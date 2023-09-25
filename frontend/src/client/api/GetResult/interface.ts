import type { ApiContext } from './../../ApiContext';
import type { Location } from '@/types/Location';

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
  locations: Location[];
}

export interface GetResultServerResponse {
  recommendation: Recommendation[];
}

type Recommendation = {
  date: string;
  activities: Activity[];
};

type Activity = {
  place: string;
  description: string;
};
