const { expect } = require('chai');
const {
    handleMove,
    resetBoard,
    scorePlayerOne,
    scorePlayerTwo
} = require('../../../game.cjs');

describe('TicTacToe Game', () => {
    beforeEach(() => {
        // Reset the board before each test
        resetBoard();
    });

    // Add your test cases here

    it('should handle player moves correctly', () => {
        // Make player moves
        handleMove(0);
        handleMove(1);
        handleMove(4);
        handleMove(5);
        handleMove(8);

        // Verify the state of the board
        expect(scorePlayerOne).to.equal(1);
        expect(scorePlayerTwo).to.equal(0);
        expect(gameOver).to.be.true;
    });

    // Add more test cases for different game scenarios





    it('should toggle the current player after each move', () => {
        // Make player moves
        handleMove(0);
        expect(currentPlayer).to.equal(playerTwo);
        handleMove(1);
        expect(currentPlayer).to.equal(playerOne);
        handleMove(4);
        expect(currentPlayer).to.equal(playerTwo);
    });

    it('should correctly detect horizontal wins', () => {
        // Set up a horizontal win scenario
        board = [playerOne, playerOne, playerOne, 0, 0, 0, 0, 0, 0];

        // Make a player move that triggers a win
        handleMove(6);

        // Verify the state of the game
        expect(scorePlayerOne).to.equal(1);
        expect(gameOver).to.be.true;
    });

    it('should correctly detect vertical wins', () => {
        // Set up a vertical win scenario
        board = [playerOne, 0, 0, playerOne, 0, 0, playerOne, 0, 0];

        // Make a player move that triggers a win
        handleMove(2);

        // Verify the state of the game
        expect(scorePlayerOne).to.equal(1);
        expect(gameOver).to.be.true;
    });

    it('should correctly detect diagonal wins', () => {
        // Set up a diagonal win scenario
        board = [playerOne, 0, 0, 0, playerOne, 0, 0, 0, playerOne];

        // Make a player move that triggers a win
        handleMove(1);

        // Verify the state of the game
        expect(scorePlayerOne).to.equal(1);
        expect(gameOver).to.be.true;
    });

    it('should correctly detect a tie game', () => {
        // Set up a tie game scenario
        board = [playerOne, playerTwo, playerOne, playerTwo, playerOne, playerTwo, playerTwo, playerOne, playerTwo];

        // Make a player move that triggers a tie
        handleMove(6);

        // Verify the state of the game
        expect(scorePlayerOne).to.equal(0);
        expect(scorePlayerTwo).to.equal(0);
        expect(gameOver).to.be.true;
    });
});
