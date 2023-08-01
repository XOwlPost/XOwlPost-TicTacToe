export const GameListResponseSchema = {
  type: 'object',
  properties: {
    games: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          gameId: { type: 'string' },
          gameName: { type: 'string' },
          numPlayers: { type: 'number' },
          duration: { type: 'number' },
          isActive: { type: 'boolean' },
          startDate: { type: 'string', format: 'date' },
          winner: { type: 'string' },
          gameType: { type: 'string' },
        },
        required: ['gameId', 'gameName', 'numPlayers', 'duration', 'isActive', 'gameType'],
      },
    },
    totalGames: { type: 'number' },
    currentPage: { type: 'number' },
    pageSize: { type: 'number' },
    totalPages: { type: 'number' },
    hasNextPage: { type: 'boolean' },
    hasPreviousPage: { type: 'boolean' },
  },
  required: ['games', 'totalGames', 'currentPage', 'pageSize', 'totalPages', 'hasNextPage', 'hasPreviousPage'],
};
