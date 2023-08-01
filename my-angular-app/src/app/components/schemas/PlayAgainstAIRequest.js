export const PlayAgainstAIRequest: SchemaObject = {
  type: 'object',
  properties: {
    gameType: { type: 'string' },
    aiLevel: { type: 'number' },
    playerName: { type: 'string' },
    timeLimit: { type: 'number' },
    difficulty: { type: 'string' },
    boardSize: { type: 'number' },
  },
  required: ['gameType', 'aiLevel', 'playerName', 'timeLimit', 'difficulty', 'boardSize'],
};
