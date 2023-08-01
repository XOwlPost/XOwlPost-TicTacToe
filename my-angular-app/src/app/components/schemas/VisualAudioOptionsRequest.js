export const VisualAudioOptionsRequest = {
  type: 'object',
  properties: {
    animationEffects: { type: 'boolean' },
    transitionEffects: { type: 'boolean' },
    soundEffects: { type: 'boolean' },
    colorTheme: { type: 'string' },
    // Add more properties as needed
    customProperty1: { type: 'string' },
    customProperty2: { type: 'number' },
  },
  required: ['animationEffects', 'transitionEffects', 'soundEffects', 'colorTheme'],
};
