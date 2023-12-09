import { Magic } from 'magic-sdk';
import { handleMove, resetBoard, scorePlayerOne, scorePlayerTwo } from './JS/app.mjs';

require('dotenv').config()

const express = require('express');
const app = express();

const config = require('./config/config.dev.js');

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

// The rest of your Express app setup...
const magic = new Magic(process.env.MAGIC_API_KEY);


async function connectWallet() {
  await magic.auth.loginWithPopup();
  const address = await magic.user.getMetadata();
  console.log(`Connected to wallet with address: ${address.publicAddress}`);
}

connectWallet();

const sb = new SendBird({
  appId: 'Y6BF66FF3-F51A-442A-BEF6-B9FCC68CB5D0R_APP_ID'
});

const sbOptions = {
  userId: 'sendbird_desk_agent_id_b40dfce5-cd33-4013-902f-3f5dee372cbd',
  accessToken: '818a697587b3a3253b419d04577aaa6e126af911'
};

const UIKit = new SendBirdUIKit(sb);
UIKit.createChannelWithUserIds(['OTHER_USER_ID'], {
  isDistinct: true,
  isPublic: false,
  isEphemeral: false,
  customType: 'CUSTOM_TYPE',
  name: 'CHANNEL_NAME',
  coverUrl: 'COVER_IMAGE_URL',
  data: 'CUSTOM_DATA'
}, sbOptions, (channel, error) => {
  if (error) {
    console.error(error);
    return;
  }

  // channel object and UIKit object are now available
  // initialize the Tic Tac Toe game board
  initGameBoard();
});

function initGameBoard() {
  const gameContainer = document.querySelector('#game-container');
  const board = document.createElement('div');
  board.classList.add('board');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', function() {
      handleMove(i);
      renderBoard();
    });
    board.appendChild(cell);
  }
  gameContainer.appendChild(board);

  const resetButton = document.querySelector('#reset-button');
  resetButton.addEventListener('click', function() {
    resetBoard();
    renderBoard();
  });

  renderBoard();
}

function renderBoard() {
  const board = document.querySelector('.board');
  for (let i = 0; i < 9; i++) {
    const cell = board.children[i];
    if (cell.textContent !== board[i]) {
      cell.textContent = board[i];
    }
  }

  const scorePlayerOneElement = document.querySelector('#score-player-one');
  scorePlayerOneElement.textContent = scorePlayerOne;

  const scorePlayerTwoElement = document.querySelector('#score-player-two');
  scorePlayerTwoElement.textContent = scorePlayerTwo;
}
