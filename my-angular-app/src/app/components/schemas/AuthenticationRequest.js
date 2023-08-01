export const AuthenticationSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    expiresIn: { type: 'number' }
  }
};
