import type { Collection } from 'mongodb';
import { ObjectId } from 'mongodb';
import type BaseModel from './model';
import clientPromise from './client';

class BaseRepository<T extends BaseModel> {
  private collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  async find(id: string): Promise<T | null> {
    const result = await this.collection.findOne({ _id: new ObjectId(id) });
    return result ? (result as T) : null;
  }

  async insert(item: T): Promise<string> {
    const result = await this.collection.insertOne(item);
    return result.insertedId.toString();
  }

  async update(id: string, item: T): Promise<boolean> {
    const result = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: item });
    return result.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async list(page: number, pageSize: number): Promise<T[]> {
    const result = await this.collection
      .find()
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray();

    return result as T[];
  }
}

async function createRepository<T extends BaseModel>(databaseName: string, collectionName: string) {
  const client = await clientPromise;
  const collection = client.db(databaseName).collection(collectionName);
  return new BaseRepository<T>(collection);
}

export { BaseRepository, createRepository };
