import type { ApiContext } from '@/client/ApiContext';
import getResultMock from './mock';
import type { GetResultInterface, GetResultRequest } from './interface';

// const axios = require('axios');

const getResult: GetResultInterface = async (context: ApiContext, request: GetResultRequest) => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  // Return mock if context usemock
  if (context.useMock) {
    return getResultMock(request);
  }

  // Else call the api like below
  return getResultMock(request);

  // try {
  //   const response: GetResultResponse = await axios.get('endpoint')
  // } catch (error) {
  //   throw error;
  // }
};

export default getResult;
