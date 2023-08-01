export const ErrorResponse = {
  type: 'object',
  properties: {
    error: { type: 'string' },
    message: { type: 'string' },
    status: { type: 'number' }
  }
};
