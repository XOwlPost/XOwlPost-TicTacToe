export const MakeMoveRequest = {
  type: 'object',
  properties: {
    gameId: { type: 'string' },
    playerId: { type: 'string' },
    move: {
      type: 'object',
      properties: {
        row: { type: 'number' },
        column: { type: 'number' },
      },
      required: ['row', 'column'],
    },
    timestamp: { type: 'string', format: 'date-time' },
    additionalData: { type: 'object' },
  },
  required: ['gameId', 'playerId', 'move', 'timestamp', 'additionalData'],
};
