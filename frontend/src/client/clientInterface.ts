import type { GetDistanceMatrixInterface } from './api/get-distance-matrix/interface';
import type { GetNewLocationInterface } from './api/get-new-location/interface';
import type { GetRestaurantInterface } from './api/get-restaurant/interface';
import type { GetResultInterface } from './api/get-result/interface';

export interface ClientInterface {
  getResult: GetResultInterface;
  getLocation: GetNewLocationInterface;
  getRestaurant: GetRestaurantInterface;
  getDistanceMatrix: GetDistanceMatrixInterface;
}
