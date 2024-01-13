import type { Collection } from 'mongodb';
import { ObjectId } from 'mongodb';

import clientPromise from '@/server/service/database/base/client';
import databaseConfigs from '@/server/service/database/base/config';
import { convertToModel, convertToOID } from '@/server/service/database/base/helper';
import type DataAccessor from '@/server/service/database/base/interface';
import type BaseModel from '@/server/service/database/base/model';

class BaseRepository<T extends BaseModel> implements DataAccessor<T> {
  private collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  async find(id: string): Promise<T | null> {
    const result = await this.collection.findOne({ _id: new ObjectId(id) });
    return result && !result.isDeleted ? (convertToModel(result) as T) : null;
  }

  async insert(item: T): Promise<string | null> {
    const result = await this.collection.insertOne(convertToOID(item));
    return result.insertedId?.toString();
  }

  async update(item: T): Promise<boolean> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(item._id) },
      { $set: convertToOID(item) },
    );
    return result.modifiedCount > 0;
  }

  // async list(page: number, pageSize: number): Promise<T[]> {
  //   const result = await this.collection
  //     .find()
  //     .skip(page * pageSize)
  //     .limit(pageSize)
  //     .toArray();

  //   return result as T[];
  // }
}

async function createRepository<T extends BaseModel>(collectionName: string) {
  const client = await clientPromise;
  const collection = client.db(databaseConfigs.databaseName).collection(collectionName);
  return new BaseRepository<T>(collection);
}

export { BaseRepository, createRepository };
