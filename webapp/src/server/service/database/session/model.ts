import type BaseModel from '@/server/service/database/base/model';
import type { Recommendation } from '@/types/recommendation';

interface Session extends BaseModel {
  userId: string;
  tripTitle: string;
  recommendations: Recommendation[];
}

export default Session;
