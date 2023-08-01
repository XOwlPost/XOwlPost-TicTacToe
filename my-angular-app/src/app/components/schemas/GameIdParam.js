export const GameIdParamSchema = {
  type: 'object',
  properties: {
    gameId: { type: 'string' },
  },
  required: ['gameId'],
};
