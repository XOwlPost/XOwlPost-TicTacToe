export const GameResponse = {
  id: {
    type: 'string'
  },
  player1: {
    type: 'string'
  },
  player2: {
    type: 'string'
  },
  board: {
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  scoreboard: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        player: { type: 'string' },
        score: { type: 'number' }
      }
    }
  },
  visibility: {
    type: 'boolean'
  },
  aiMoveSuggestions: {
    type: 'array',
    items: {
      type: 'string'
    }
  },
  requestRevenge: {
    type: 'object',
    properties: {
      status: { type: 'string' },
      message: { type: 'string' }
    }
  },
  doubleDownBet: {
    type: 'object',
    properties: {
      betAmount: { type: 'number' },
      betMultiplier: { type: 'number' },
      message: { type: 'string' }
    }
  },
  playerWinEffects: {
    type: 'boolean'
  },
  playerLoseEffects: {
    type: 'boolean'
  },
  playerRevengeEffects: {
    type: 'boolean'
  },
  opponentRevengeEffects: {
    type: 'boolean'
  },
  playerDoubleDownEffects: {
    type: 'boolean'
  },
  opponentDoubleDownEffects: {
    type: 'boolean'
  },
  playerWinInARowEffects: {
    type: 'boolean'
  },
  playerLoseInARowEffects: {
    type: 'boolean'
  },
  playerAcceptRevengeEffects: {
    type: 'boolean'
  },
  playerWinDoubleDownEffects: {
    type: 'boolean'
  },
  playerLoseDoubleDownEffects: {
    type: 'boolean'
  },
  playerWinDoubleDownInARowEffects: {
    type: 'boolean'
  },
  playerLoseDoubleDownInARowEffects: {
    type: 'boolean'
  },
  playerWinDoubleDown3InARowEffects: {
    type: 'boolean'
  },
  playerLoseDoubleDown3InARowEffects: {
    type: 'boolean'
  },
  playerWinDoubleDown4InARowEffects: {
    type: 'boolean'
  },
  playerLoseDoubleDown4InARowEffects: {
    type: 'boolean'
  },
  playerWinDoubleDown5InARowEffects: {
    type: 'boolean'
  },
  playerLoseDoubleDown5InARowEffects: {
    type: 'boolean'
  },
  playerWinInteractiveEffects: {
    type: 'boolean'
  },
  playerLoseInteractiveEffects: {
    type: 'boolean'
  },
  player6WinInARowEffects: {
    type: 'boolean'
  },
  player6WinInARowDoubleDownEffects: {
    type: 'boolean'
  },
  narrator: {
    type: 'boolean'
  },
  voiceControl: {
    type: 'boolean'
  },
  // Add more properties for other endpoints
};




export const GameListResponse = {
  type: 'array',
  items: GameResponse
};

export const GameIdParam = {
  type: 'object',
  properties: {
    id: { type: 'string' }
  }
};

export const SetGameVisibilityRequest = {
  type: 'object',
  properties: {
    visibility: { type: 'boolean' }
  }
};

export const AIPlayerMoveRequest = {
  type: 'object',
  properties: {
    aiLevel: { type: 'number' }
  }
};


// Rest of the schemas...

export const AccessibilityOptionsRequest = {
  type: 'object',
  properties: {
    option1: { type: 'boolean' },
    option2: { type: 'boolean' },
    option3: { type: 'boolean' },
    option4: { type: 'boolean' },
    option5: { type: 'boolean' },
    option6: { type: 'boolean' },
    option7: { type: 'boolean' },
    option8: { type: 'boolean' },
    option9: { type: 'boolean' },
    option10: { type: 'boolean' },
    option11: { type: 'boolean' },
    option12: { type: 'boolean' },
    option13: { type: 'boolean' },
    option14: { type: 'boolean' },
    option15: { type: 'boolean' },
    option16: { type: 'boolean' },
    option17: { type: 'boolean' },
    option18: { type: 'boolean' },
    option19: { type: 'boolean' },
    option20: { type: 'boolean' },
    option21: { type: 'boolean' },
    option22: { type: 'boolean' },
    option23: { type: 'boolean' },
    option24: { type: 'boolean' },
    option25: { type: 'boolean' },
    option26: { type: 'boolean' },
    option27: { type: 'boolean' },
    option28: { type: 'boolean' },
    option29: { type: 'boolean' },
    option30: { type: 'boolean' },
    option31: { type: 'boolean' },
    option32: { type: 'boolean' },
    option33: { type: 'boolean' },
    option34: { type: 'boolean' },
    option35: { type: 'boolean' },
    option36: { type: 'boolean' }
    // Add more accessibility options as needed
  }
};


    add Play Against AI,
  Show Scoreboard: `GET /scoreboard
