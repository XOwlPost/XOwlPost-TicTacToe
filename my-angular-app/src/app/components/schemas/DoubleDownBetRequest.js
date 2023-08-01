export const doubleDownBet = {
  type: 'object',
  properties: {
    betAmount: { type: 'number' },
    betMultiplier: { type: 'number' },
    message: { type: 'string' },
    additionalProperty1: {
      type: 'string',
      description: 'Additional information about the bet', // Description of the additional property store information like the user's unique identifier, transaction ID, or any other relevant data that can help identify or process the bet
      maxLength: 100, // Maximum length of the additional property value
    },
  },
  required: ['betAmount', 'betMultiplier', 'message', 'additionalProperty1'], // Include additionalProperty1 in the required array
  additionalProperties: false,
};
