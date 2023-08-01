import { AuthenticationSchema } from './AuthenticationSchema';

export const ErrorHandlingRequest = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        // Include additional specific properties related to the request data
        // For example:
        // email: { type: 'string', format: 'email' },
        // address: {
        //   type: 'object',
        //   properties: {
        //     street: { type: 'string' },
        //     city: { type: 'string' },
        //     zipCode: { type: 'string' },
        //   },
        // },
        authentication: AuthenticationSchema,
      },
    },
    error: ErrorSchema,
  },
  required: ['error'],
};
