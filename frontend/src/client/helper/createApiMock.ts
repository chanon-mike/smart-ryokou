const createApiMock =
  <APIRequest, APIResponse>(
    mockCases: ReadonlyArray<{ request: APIRequest; response: APIResponse }>,
    defaultResponse: APIResponse,
  ) =>
  (request: APIRequest): APIResponse => {
    for (const mockCase of mockCases) {
      if (JSON.stringify(mockCase.request) === JSON.stringify(request)) {
        return mockCase.response;
      }
    }
    return defaultResponse;
  };

export default createApiMock;
