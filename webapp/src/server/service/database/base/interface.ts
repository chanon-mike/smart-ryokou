import type BaseModel from '@/server/service/database/base/model';

// TODO: Define DataAccessorQueriable
interface DataAccessor<T extends BaseModel> {
  find(id: string): Promise<T | null>;
  insert(item: T): Promise<string | null>;
  update(item: T): Promise<boolean>;

  // Instead of delete, update the isDeleted tag for soft delete
  // delete(id: string): Promise<boolean>;
}

export default DataAccessor;
