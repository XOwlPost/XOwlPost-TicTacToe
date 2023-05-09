// Initialize variables
let playerOne = "X";
let playerTwo = "O";
let currentPlayer = playerOne;
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let gameOver = false;
let scorePlayerOne = 0;
let scorePlayerTwo = 0;

// Function to toggle the current player
function togglePlayer() {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
}

// Function to check if the game is over
function checkGameOver() {
  // Check for horizontal wins
  for (let i = 0; i < 9; i += 3) {
    if (board[i] !== 0 && board[i] === board[i + 1] && board[i] === board[i + 2]) {
      gameOver = true;
      break;
    }
  }

  // Check for vertical wins
  for (let i = 0; i < 3; i++) {
    if (board[i] !== 0 && board[i] === board[i + 3] && board[i] === board[i + 6]) {
      gameOver = true;
      break;
    }
  }

  // Check for diagonal wins
  if (board[0] !== 0 && board[0] === board[4] && board[0] === board[8]) {
    gameOver = true;
  }

  if (board[2] !== 0 && board[2] === board[4] && board[2] === board[6]) {
    gameOver = true;
  }

  // Check for tie game
  if (!gameOver && board.filter((val) => val === 0).length === 0) {
    gameOver = true;
  }
}

// Function to reset the board
function resetBoard() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  gameOver = false;
}

// Function to handle a player move
function handleMove(cellIndex) {
  if (board[cellIndex] === 0 && !gameOver) {
    board[cellIndex] = currentPlayer;
    checkGameOver();

    if (gameOver) {
      if (currentPlayer === playerOne) {
        scorePlayerOne++;
      } else {
        scorePlayerTwo++;
      }
    } else {
      togglePlayer();
    }
  }
}

// Export functions and variables for other modules to use
export { handleMove, resetBoard, scorePlayerOne, scorePlayerTwo };
