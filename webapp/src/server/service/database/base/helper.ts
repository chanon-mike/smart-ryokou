import type { Document, WithId } from 'mongodb';
import { ObjectId } from 'mongodb';

import type BaseModel from '@/server/service/database/base/model';

const convertToOID = (item: BaseModel) => {
  return { ...item, _id: new ObjectId(item._id) };
};

const convertToModel = (item: WithId<Document>) => {
  return { ...item, _id: item._id.toString() };
};

export { convertToModel, convertToOID };
