import type { ClientInterface } from './ClientInterface';
import getResult from './api/get-result/implement';
import getLocation from './api/get-new-location/implement';
import { getRestaurant } from './api/get-restaurant/implement';

const Client: ClientInterface = {
  getResult,
  getLocation,
  getRestaurant,
};

export default Client;
