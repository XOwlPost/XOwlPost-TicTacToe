import Ajv from 'ajv';
import logger from './logger';

// Create an instance of Ajv
const ajv = new Ajv();

export const GameEffectsSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    // Game effects properties...
  },
};

// Create a function that returns the cached validation function
const getCachedValidate = (() => {
  // Create a variable to hold the cached validation function
  let cachedValidate;

  // Return a function that either retrieves the cached validation function
  // or compiles the schema and caches the validation function
  return () => {
    if (!cachedValidate) {
      const validate = ajv.compile(GameEffectsSchema);
      cachedValidate = validate;
    }

    return cachedValidate;
  };
})();

// Create a function to validate the game effects against the schema
export const validateGameEffects = (gameEffects) => {
  const validate = getCachedValidate();
  const isValid = validate(gameEffects);

  if (!isValid) {
    // Log the validation errors using the logger
    logger.error('Game effects validation errors:', { errors: validate.errors });
  }

  return isValid;
};
