import type { Location } from '@/types/recommendation';
import type { ApiContext } from '../../ApiContext';

export type GetNewLocationInterface = (
  context: ApiContext,
  request: GetNewLocationRequest,
) => Promise<GetNewLocationResponse>;

export interface GetNewLocationRequest {
  trip_title: string;
  user_prompt: string;
  suggested_places: string[];
}

export interface GetNewLocationResponse {
  place: string;
  locations: Location[];
}

export interface GetNewLocationServerResponse {
  place: string;
  recommendations: {
    place: string;
    description: string;
  }[];
}
