export const GameResponse = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    player1: { type: 'string' },
    player2: { type: 'string' },
    board: {
      type: 'array',
      items: {
        type: 'array',
        items: { type: 'string' }
      }
    },
    scoreboard: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          player: { type: 'string' },
          score: { type: 'number' }
        },
        required: ['player', 'score']
      }
    },
    visibility: { type: 'boolean' },
    aiMoveSuggestions: {
      type: 'array',
      items: { type: 'string' }
    },
    requestRevenge: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        message: { type: 'string' }
      },
      required: ['status', 'message']
    },
    doubleDownBet: {
      type: 'object',
      properties: {
        betAmount: { type: 'number' },
        betMultiplier: { type: 'number' },
        message: { type: 'string' }
      },
      required: ['betAmount', 'betMultiplier', 'message']
    },
    colorContrast: { type: 'boolean' },
    screenReaderSupport: { type: 'boolean' },
    keyboardNavigation: { type: 'boolean' },
    highContrastMode: { type: 'boolean' },
    textSizeAdjustment: {
      type: 'string',
      enum: ['small', 'medium', 'large']
    },
    focusStyle: {
      type: 'string',
      enum: ['dotted', 'solid', 'dashed']
    },
    alternativeText: { type: 'boolean' },
    animationEffects: { type: 'boolean' },
    transitionEffects: { type: 'boolean' },
    soundEffects: { type: 'boolean' },
    colorTheme: { type: 'string' },
    playerWinEffects: { type: 'boolean' },
    playerLoseEffects: { type: 'boolean' },
    playerRevengeEffects: { type: 'boolean' },
    opponentRevengeEffects: { type: 'boolean' },
    playerDoubleDownEffects: { type: 'boolean' },
    opponentDoubleDownEffects: { type: 'boolean' },
    playerWinInARowEffects: { type: 'boolean' },
    playerLoseInARowEffects: { type: 'boolean' },
    playerAcceptRevengeEffects: { type: 'boolean' },
    playerWinDoubleDownEffects: { type: 'boolean' },
    playerLoseDoubleDownEffects: { type: 'boolean' },
    playerWinDoubleDownInARowEffects: { type: 'boolean' },
    playerLoseDoubleDownInARowEffects: { type: 'boolean' },
    playerWinDoubleDown3InARowEffects: { type: 'boolean' },
    playerLoseDoubleDown3InARowEffects: { type: 'boolean' },
    playerWinDoubleDown4InARowEffects: { type: 'boolean' },
    playerLoseDoubleDown4InARowEffects: { type: 'boolean' },
    playerWinDoubleDown5InARowEffects: { type: 'boolean' },
    playerLoseDoubleDown5InARowEffects: { type: 'boolean' },
    playerWinInteractiveEffects: { type: 'boolean' },
    playerLoseInteractiveEffects: { type: 'boolean' },
    player6WinInARowEffects: { type: 'boolean' },
    player6WinInARowDoubledownEffects: { type: 'boolean' },
    narrator: { type: 'boolean' },
    voiceControl: { type: 'boolean' }
  },
  required: [
    'id',
    'player1',
    'player2',
    'board',
    'scoreboard',
    'visibility'
  ]
};

export const PublicGamesResponse = {
  type: 'array',
  items: { type: 'string' }
};

export const GameListResponse = {
  type: 'array',
  items: GameResponse
};

export const GameIdParam = {
  type: 'object',
  properties: {
    id: { type: 'string' }
  },
  required: ['id']
};

export const SetGameVisibilityRequest = {
  type: 'object',
  properties: {
    visibility: { type: 'boolean' }
  },
  required: ['visibility']
};

export const AIPlayerMoveRequest = {
  type: 'object',
  properties: {
    aiLevel: { type: 'number' }
  },
  required: ['aiLevel']
};

export const AccessibilityOptionsRequest = {
  type: 'object',
  properties: {
    colorContrast: { type: 'boolean' },
    screenReaderSupport: { type: 'boolean' },
    keyboardNavigation: { type: 'boolean' },
    highContrastMode: { type: 'boolean' },
    textSizeAdjustment: {
      type: 'string',
      enum: ['small', 'medium', 'large']
    },
    focusStyle: {
      type: 'string',
      enum: ['dotted', 'solid', 'dashed']
    },
    alternativeText: { type: 'boolean' },
    narrator: { type: 'boolean' },
    voiceControl: { type: 'boolean' }
  },
  required: [
    'colorContrast',
    'screenReaderSupport',
    'keyboardNavigation',
    'highContrastMode',
    'textSizeAdjustment',
    'focusStyle',
    'alternativeText',
    'narrator',
    'voiceControl'
  ]
};
