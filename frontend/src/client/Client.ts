import type { ClientInterface } from './ClientInterface';
import getResult from './api/get-result/implement';
import getLocation from './api/get-new-location/implement';
import { getRestaurant } from './api/get-restaurant/implement';
import { getDistanceMatrix } from './api/get-distance-matrix/implement';

const Client: ClientInterface = {
  getResult,
  getLocation,
  getRestaurant,
  getDistanceMatrix,
};

export default Client;
