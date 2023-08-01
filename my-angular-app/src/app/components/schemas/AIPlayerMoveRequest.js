export const AIPlayerMoveSchema = {
  type: 'object',
  properties: {
    aiMoveSuggestions: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};
