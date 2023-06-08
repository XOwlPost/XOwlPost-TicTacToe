// Import the game board stack functions and array from the gameboard-stack.js file
import { pushGameState, popGameState, getPreviousGameState, gameBoardStack } from './gameboard-stack.js';

// Get the player name input elements
const playerXNameInput = document.getElementById("playerX-name");
const playerONameInput = document.getElementById("playerO-name");

// Function to get the player names
function getPlayerNames() {
  const playerXName = playerXNameInput.value;
  const playerOName = playerONameInput.value;

  // Do something with the player names (e.g., store them, display them, etc.)
  console.log("Player X Name:", playerXName);
  console.log("Player O Name:", playerOName);
}

// Call the getPlayerNames function when needed (e.g., when the game starts)
getPlayerNames();

// Array to store the game board state
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Function to handle the game logic
function playGame(cellIndex) {
  // Push the current game board state to the stack before updating it
  pushGameState(gameBoard);

  // Update the game board with the current player's move
  gameBoard[cellIndex] = currentPlayer;

  // Check for game-winning conditions
  if (checkWin()) {
    // If a player wins, update the status message
    updateStatusMessage(statusMessages.playerWin + currentPlayer);
    // Trigger the game over logic
    gameOver('win');
    return;
  }

  // Check for a tie
  if (checkTie()) {
    // If it's a tie, update the status message
    updateStatusMessage(statusMessages.tie);
    // Trigger the game over logic
    gameOver('tie');
    return;
  }

  // Switch to the next player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  // Update the status message to indicate the next player's turn
  updateStatusMessage(statusMessages.playerTurn + currentPlayer);
}

// Function to handle the user's move
function makeMove(selectedCell) {
  // Get the data-cell attribute value of the selected cell
  const cellIndex = selectedCell.dataset.cell;

  // Check if the selected cell is already occupied
  if (gameBoard[cellIndex] !== '') {
    // If the cell is occupied, show an error message or handle it accordingly
    return;
  }

  // Call the playGame function to update the game board and status message
  playGame(cellIndex);
}

// Function to check for a win
function checkWin() {
  // Define the winning combinations
  const winningCombinations = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check each winning combination
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoard[a] !== '' &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true; // Game-winning condition is met
    }
  }

  return false; // No winning condition is
