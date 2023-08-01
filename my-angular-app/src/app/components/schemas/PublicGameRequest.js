export const PublicGamesResponse: SchemaObject = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      gameId: { type: 'string' },
      gameName: { type: 'string' },
      numPlayers: { type: 'number' },
      duration: { type: 'number' },
      isActive: { type: 'boolean' },
      startDate: { type: 'string', format: 'date-time' },
      totalPages: { type: 'number' },
      hasNextPage: { type: 'boolean' },
      hasPreviousPage: { type: 'boolean' },
      gameBoard: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      customProperty1: { type: 'string' },
      customProperty2: { type: 'number' },
      // Add more properties as needed
    },
    required: ['gameId', 'gameName', 'numPlayers', 'duration', 'isActive', 'gameBoard'],
  },
};
