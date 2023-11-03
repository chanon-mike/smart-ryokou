import type { GetResultInterface } from './api/GetResult/interface';
import type { GetNewLocationInterface } from './api/get-new-location/interface';

export interface ClientInterface {
  getResult: GetResultInterface;
  getLocation: GetNewLocationInterface;
}
