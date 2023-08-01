export const ResetGameRequest = {
  type: 'object',
  properties: {
    gameId: { type: 'string' },
    playerIds: { type: 'array', items: { type: 'string' } },
    resetOptions: {
      type: 'object',
      properties: {
        includeScores: { type: 'boolean' },
        includeSettings: { type: 'boolean' },
        includeBoard: { type: 'boolean' },
        includeMoves: { type: 'boolean' },
        includePlayers: { type: 'boolean' },
        includeGameType: { type: 'boolean' },
        includeWinners: { type: 'boolean' },
        includeTurn: { type: 'boolean' },
        includeTimer: { type: 'boolean' },
        includeCustomData: { type: 'boolean' }, // Add the includeCustomData property
      },
      additionalProperties: false,
    },
  },
  required: ['gameId', 'playerIds', 'resetOptions'],
};
