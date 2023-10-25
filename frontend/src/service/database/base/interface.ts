import type BaseModel from './model';

// TODO: Define DataAccessorQueriable
interface DataAccessor<T extends BaseModel> {
  find(id: string): Promise<T | null>;
  insert(item: T): Promise<string | null>;
  update(item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export default DataAccessor;
