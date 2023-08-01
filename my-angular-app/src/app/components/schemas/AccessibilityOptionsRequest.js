export const AccessibilityOptionsSchema = {
  type: 'object',
  properties: {
    colorContrast: { type: 'boolean' },
    screenReaderSupport: { type: 'boolean' },
    keyboardNavigation: { type: 'boolean' },
    highContrastMode: { type: 'boolean' },
    textSizeAdjustment: { type: 'string', enum: ['small', 'medium', 'large'] },
    focusStyle: { type: 'string', enum: ['dotted', 'solid', 'dashed'] },
    alternativeText: { type: 'boolean' },
    narrator: { type: 'boolean' },
    voiceControl: { type: 'boolean' }
  }
};
