import Ajv from 'ajv';
import { GameEffectsSchema } from './GameEffectsSchema';

const ajv = new Ajv();
const validateGameEffects = ajv.compile(GameEffectsSchema);

// Example game effects request object
const gameEffectsRequest = {
  playerWinEffects: true,
  playerLoseEffects: false,
  playerName: 'John Doe',
  playerThrowEffects: 'effect name',
  playerScore: 100,
  playerColors: ['blue', 'red'],
  playerEffectsEnabled: true,
  playerHitSound: true,
  playerGameOverEffect: 'effect name',
  animationEffects: true,
  transitionEffects: true,
  soundEffects: true,
  colorTheme: 'dark',
  playerRevengeEffects: false,
  opponentRevengeEffects: false,
  playerDoubleDownEffects: true,
  opponentDoubleDownEffects: false,
  playerWinInARowEffects: true,
  playerLoseInARowEffects: false,
  playerAcceptRevengeEffects: false,
  playerWinDoubleDownEffects: true,
  playerLoseDoubleDownEffects: false,
  playerWinDoubleDownInARowEffects: false,
  playerLoseDoubleDownInARowEffects: true,
  playerWinDoubleDown3InARowEffects: true,
  playerLoseDoubleDown3InARowEffects: false,
  playerWinDoubleDown4InARowEffects: false,
  playerLoseDoubleDown4InARowEffects: true,
  playerWinDoubleDown5InARowEffects: false,
  playerLoseDoubleDown5InARowEffects: true,
  playerWinInteractiveEffects: true,
  playerLoseInteractiveEffects: false,
  player6WinInARowEffects: true,
  player6WinInARowDoubledownEffects: true,
};

// Validate the game effects request object
const isValid = validateGameEffects(gameEffectsRequest);

if (isValid) {
  console.log('Game effects request is valid');
} else {
  console.log('Game effects request is invalid');
  console.log(validateGameEffects.errors);
}
