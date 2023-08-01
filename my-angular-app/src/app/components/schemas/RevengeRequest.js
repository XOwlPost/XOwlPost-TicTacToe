export const RevengeRequest = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['status', 'message'],
};
import { RevengeRequest } from './RevengeRequest';


