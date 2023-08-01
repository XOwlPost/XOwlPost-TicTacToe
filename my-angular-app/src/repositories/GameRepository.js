const gameRepository = require('../repositories/GameRepository');
const ajv = require('ajv')();
const Joi = require('joi');
const winston = require('winston');

// JSON schema for the request body
const schema = Joi.object({
  gameId: Joi.string().required(),
  effect: Joi.string().required(),
});

// Handle game effects
const handleGameEffects = (req, res) => {
  // Validate the request body against the JSON schema
  const { error } = schema.validate(req.body);
  if (error) {
    return handleError(res, error);
  }

  // Extract necessary data from the request body
  const { gameId, effect } = req.body;

  try {
    // Get the game from the repository based on the gameId
    const game = gameRepository.getGameById(gameId);

    // Apply the effect to the game
    applyEffect(game, effect);

    // Save the updated game in the repository
    gameRepository.saveGame(game);

    // Return a success response
    res.status(200).json({ success: true, message: 'Game effects applied successfully.' });
  } catch (error) {
    // Handle any errors that occurred during the process
    return handleError(res, error);
  }
};

// Helper function to apply game effects
const applyEffect = (game, effect) => {
  // Apply the effect to the game state
  // You can add your custom logic here
  // For example, updating game properties based on the effect received
  game.someProperty = effect;
};

// Error handling function
const handleError = (res, error) => {
  // Log the error using Winston
  winston.error('Error applying game effects:', error);

  // Send the error response
  res.status(500).json({ success: false, message: 'Failed to apply game effects.' });
};

module.exports = {
  handleGameEffects,
};
