export const CreateGameSchema = {
  type: 'object',
  properties: {
    player1: {
      type: 'string',
      minLength: 2,
      maxLength: 20
    },
    player2: {
      type: 'string',
      minLength: 2,
      maxLength: 20
    },
    gameType: {
      type: 'string',
      enum: ['standard', 'advanced']
    },
    numberOfRounds: {
      type: 'integer',
      minimum: 1,
      maximum: 10
    },
    customOptions: {
      type: 'object',
      properties: {
        option1: { type: 'boolean' },
        option2: { type: 'boolean' },
        option3: { type: 'boolean' }
      }
    }
  },
  required: ['player1', 'player2'],
  additionalProperties: false
};
