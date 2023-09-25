import type { ClientInterface } from './ClientInterface';
import getResult from './api/GetResult/implement';

const Client: ClientInterface = {
  getResult,
};

export default Client;
