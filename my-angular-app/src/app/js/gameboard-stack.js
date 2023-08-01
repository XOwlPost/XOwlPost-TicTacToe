// gameboard-stack.js

// Stack to store the game board states
const gameBoardStack = [];

// Function to push the current game board state to the stack
function pushGameState(gameBoard) {
  gameBoardStack.push([...gameBoard]);
}

// Function to pop the last game board state from the stack
function popGameState() {
  return gameBoardStack.pop();
}

// Function to retrieve the previous game board state from the stack
function getPreviousGameState() {
  if (gameBoardStack.length > 1) {
    return gameBoardStack[gameBoardStack.length - 2];
  }
  return null;
}

// Export the functions and stack for external use
export { pushGameState, popGameState, getPreviousGameState, gameBoardStack };
