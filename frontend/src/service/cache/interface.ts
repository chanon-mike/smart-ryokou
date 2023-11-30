interface CacheServiceInterface {
  getKey(key: string): Promise<string | null>;
  checkKey(key: string): Promise<boolean>;
  setKey(key: string, value: string): Promise<boolean>;
}

export default CacheServiceInterface;
