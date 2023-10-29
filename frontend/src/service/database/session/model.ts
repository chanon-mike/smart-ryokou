import type { Recommendation } from '@/types/recommendation';
import type BaseModel from '../base/model';

interface Session extends BaseModel {
  userId: string;
  recommendations: Recommendation[];
}

export default Session;
