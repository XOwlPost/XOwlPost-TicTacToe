import { AccessibilityOptionsSchema } from './AccessibilityOptionsSchema';

export const SetGameVisibilityRequest = {
  type: 'object',
  properties: {
    visibility: { type: 'boolean' },
    gameId: { type: 'string' },
    playerId: { type: 'string' },
    accessibilityOptions: AccessibilityOptionsSchema,
  },
  required: ['visibility', 'gameId', 'playerId'],
};
