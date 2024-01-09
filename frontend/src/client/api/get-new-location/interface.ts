import type { ApiContext } from '@/client/apiContext';
import type { Location } from '@/types/recommendation';

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
  locations: Location[];
}

export interface GetNewLocationServerResponse {
  recommendations: {
    place: string;
    description: string;
  }[];
}
