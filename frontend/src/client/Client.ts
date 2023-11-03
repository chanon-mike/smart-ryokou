import type { ClientInterface } from './ClientInterface';
import getResult from './api/get-result/implement';
import getLocation from './api/get-new-location/implement';

const Client: ClientInterface = {
  getResult,
  getLocation,
};

export default Client;
