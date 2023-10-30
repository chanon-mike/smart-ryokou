import type { Document, WithId } from 'mongodb';
import { ObjectId } from 'mongodb';
import type BaseModel from './model';
import { randomBytes } from 'crypto';

const convertToOID = (item: BaseModel) => {
  return { ...item, _id: new ObjectId(item._id) };
};

const convertToModel = (item: WithId<Document>) => {
  return { ...item, _id: item._id.toString() };
};

const generateObjectId = () => {
  // Generate a 4-byte timestamp
  const timestamp = Math.floor(new Date().getTime() / 1000)
    .toString(16)
    .padStart(8, '0');

  // Generate a 5-byte random value
  const random = randomBytes(5).toString('hex');

  // Generate a 3-byte incrementing counter
  const counter = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0');

  // Combine all the parts to create the ObjectId
  const objectId = `${timestamp}${random}${counter}`;

  return objectId;
};

export { convertToModel, convertToOID, generateObjectId };
