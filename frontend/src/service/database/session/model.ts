import type { Recommendation } from '@/types/recommendation';
import type BaseModel from '../base/model';

interface Session extends BaseModel {
  userId: string;
  tripTitle: string;
  recommendations: Recommendation[];
}

export default Session;
