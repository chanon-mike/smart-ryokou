import type { ApiContext } from './../../ApiContext';
import type { Location } from '@/types/Location';

export type GetResultInterface = (
  context: ApiContext,
  request: GetResultRequest,
) => Promise<GetResultResponse>;

export interface GetResultRequest {}

export interface GetResultResponse {
  locations: Location[];
}
