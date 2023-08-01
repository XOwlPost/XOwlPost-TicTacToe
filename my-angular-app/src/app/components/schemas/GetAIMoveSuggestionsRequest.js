export const GetAIMoveSuggestionsRequest: SchemaObject = {
  type: 'object',
  properties: {
    aiLevel: { type: 'number' },
    gameId: { type: 'string' },
    playerTurn: { type: 'string' },
    board: {
      type: 'array',
      items: {
        type: 'array',
        items: { type: 'string' },
      },
    },
    gameType: { type: 'string' },
    timeLimit: { type: 'number' },
    difficultyLevel: { type: 'string' },
    previousMove: { type: 'string' },
    additionalData: { type: 'object' },
  },
  required: ['aiLevel', 'gameId', 'playerTurn', 'board', 'previousMove', 'additionalData'],
};
