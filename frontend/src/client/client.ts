import { getDistanceMatrix } from './api/get-distance-matrix/implement';
import { getLocation } from './api/get-new-location/implement';
import { getRestaurant } from './api/get-restaurant/implement';
import { getResult } from './api/get-result/implement';
import type { ClientInterface } from './clientInterface';

const client: ClientInterface = {
  getResult,
  getLocation,
  getRestaurant,
  getDistanceMatrix,
};

export default client;
