export const GetPublicGamesRequest: SchemaObject = {
  type: 'object',
  properties: {
    filterBy: {
      type: 'string',
      enum: ['active', 'completed', 'upcoming'],
    },
    sortBy: {
      type: 'string',
      enum: ['name', 'date'],
    },
    limit: {
      type: 'integer',
      minimum: 1,
    },
    page: {
      type: 'integer',
      minimum: 1,
    },
    search: {
      type: 'string',
      minLength: 1,
    },
    category: {
      type: 'string',
      enum: ['sports', 'action', 'puzzle', 'strategy'],
    },
    includePlayers: {
      type: 'boolean',
    },
    minPlayers: {
      type: 'integer',
      minimum: 1,
    },
    maxPlayers: {
      type: 'integer',
      minimum: 1,
    },
    minDuration: {
      type: 'number',
      minimum: 0,
    },
    maxDuration: {
      type: 'number',
      minimum: 0,
    },
    startDate: {
      type: 'string',
      format: 'date',
    },
    endDate: {
      type: 'string',
      format: 'date',
    },
    // Add more properties as needed
  },
  required: [],
};
