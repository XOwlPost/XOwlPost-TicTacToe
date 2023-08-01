const express = require('express');
const Ajv = require('ajv');

// Create an instance of Express
const app = express();

// Create an instance of Ajv for request validation
const ajv = new Ajv();

// Define your request schemas
const gameEffectsSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    playerWinEffects: { type: 'boolean' },
    playerLoseEffects: { type: 'boolean' },
    playerName: { type: 'string' },
    playerThrowEffects: { type: 'string' },
    playerScore: { type: 'number' },
    playerColors: { type: 'array' },
    playerEffectsEnabled: { type: 'boolean' },
    playerHitSound: { type: 'boolean' },
    playerGameOverEffect: { type: 'string' },
    animationEffects: { type: 'boolean' },
    transitionEffects: { type: 'boolean' },
    soundEffects: { type: 'boolean' },
    colorTheme: { type: 'string' },
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
    player6WinInARowDoubledownEffects: { type: 'boolean' }
  },
};

const authenticationSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    expiresIn: { type: 'number' }
  },
};

// Middleware for validating game effects request
function validateGameEffectsRequest(req, res, next) {
  const validate = ajv.compile(gameEffectsSchema);
  const isValid = validate(req.body);

  if (!isValid) {
    const validationErrors = validate.errors;
    return res.status(400).json({ error: 'Invalid game effects request', validationErrors });
  }

  // Request is valid, proceed to the next middleware
  next();
}

// Middleware for validating authentication request
function validateAuthenticationRequest(req, res, next) {
  const validate = ajv.compile(authenticationSchema);
  const isValid = validate(req.body);

  if (!isValid) {
    const validationErrors = validate.errors;
    return res.status(
