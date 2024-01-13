import type { GetDistanceMatrixInterface } from './api/distance-matrix/interface';
import type { GetNewLocationInterface } from './api/llm/new-location/interface';
import type { GetRecommendationInterface } from './api/llm/recommendation/interface';
import type { GetRestaurantInterface } from './api/restaurant/interface';

export interface ClientInterface {
  getRecommendation: GetRecommendationInterface;
  getLocation: GetNewLocationInterface;
  getRestaurant: GetRestaurantInterface;
  getDistanceMatrix: GetDistanceMatrixInterface;
}
