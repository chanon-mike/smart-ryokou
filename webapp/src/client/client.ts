import { getDistanceMatrix } from './api/distance-matrix/implement';
import { getLocation } from './api/llm/new-location/implement';
import { getRecommendation } from './api/llm/recommendation/implement';
import { getRestaurant } from './api/restaurant/implement';
import type { ClientInterface } from './clientInterface';

const client: ClientInterface = {
  getRecommendation,
  getLocation,
  getRestaurant,
  getDistanceMatrix,
};

export default client;
