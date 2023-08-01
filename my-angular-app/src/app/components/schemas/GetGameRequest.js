export const GetGameRequest: SchemaObject = {
  type: 'object',
  properties: {
    doubleDownBet: {
      type: 'object',
      properties: {
        betAmount: { type: 'number' },
        betMultiplier: { type: 'number' },
        message: { type: 'string' },
      },
      required: ['betAmount', 'betMultiplier', 'message'],
    },
    player: { type: 'string' },
    gameType: { type: 'string' },
    timeLimit: { type: 'number' },
    opponent: { type: 'string' },
    duration: { type: 'number' },
    isPublic: { type: 'boolean' },
    startDate: { type: 'string', format: 'date-time' },
    endDate: { type: 'string', format: 'date-time' },
    gameOptions: {
      type: 'object',
      properties: {
        option1: { type: 'string' },
        option2: { type: 'boolean' },
        // Add more options as needed
      },
    },
    additionalData: {
      type: 'object',
      // Add more specific properties as needed
    },
  },
  required: ['doubleDownBet', 'player', 'gameType', 'timeLimit'],
};
