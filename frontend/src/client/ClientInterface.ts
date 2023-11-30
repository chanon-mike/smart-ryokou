import type { GetResultInterface } from './api/get-result/interface';
import type { GetNewLocationInterface } from './api/get-new-location/interface';

export interface ClientInterface {
  getResult: GetResultInterface;
  getLocation: GetNewLocationInterface;
}
