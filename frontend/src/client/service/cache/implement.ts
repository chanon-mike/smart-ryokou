import type CacheServiceInterface from '@/service/cache/interface';

// TODO: Make wrapper for fetch try catch
const cacheClient: CacheServiceInterface = {
  getKey: async (key: string) => {
    try {
      const response = await fetch(encodeURI(`/api/cache?key=${key}`), {
        method: 'GET',
      });

      if (response.ok) {
        const result = await response.json();
        return result.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      return null;
    }
  },
  checkKey: async (key: string) => {
    try {
      const response = await fetch(encodeURI(`/api/cache?key=${key}`), {
        method: 'GET',
      });

      if (response.ok) {
        const result = await response.json();
        return result.data !== null;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      return false;
    }
  },
  setKey: async (key: string, value: string) => {
    try {
      const response = await fetch('/api/cache', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });

      if (response.ok) {
        const result = await response.json();
        return result.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
};

export default cacheClient;
