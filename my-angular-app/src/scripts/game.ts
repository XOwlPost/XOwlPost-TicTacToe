// Function to handle the game logic
function playGame(cellIndex) {
    // Update the game board with the current player's move
    gameBoard[cellIndex] = currentPlayer;
  
    // Check for game-winning conditions
    if (checkWin()) {
      // If a player wins, update the status message
      updateStatusMessage(statusMessages.playerWin + currentPlayer);
      // Trigger the game over logic
      gameOver('win');
  
      // Apply transition class to winning game buttons
      const winningCombination = getWinningCombination();
      winningCombination.forEach((index) => {
        const winningCell = document.querySelector(`[data-cell="${index}"]`);
        winningCell.classList.add('game-button-win');
      });
    }
  
    // Check for a tie
    if (checkTie()) {
      // If it's a tie, update the status message
      updateStatusMessage(statusMessages.tie);
      // Trigger the game over logic
      gameOver('tie');
    }
  
    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    // Update the status message to indicate the next player's turn
    updateStatusMessage(statusMessages.playerTurn + currentPlayer);
  }
  