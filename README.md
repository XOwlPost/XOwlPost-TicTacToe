# XOwlPost-TicTacToe

XOwlPost-TicTacToe is a decentralized gaming platform built on the Ethereum blockchain, allowing users to compete in the classic game of TicTacToe. Dive into a web-based application, where you can place bets on game outcomes and win unique NFT badges for significant victories.

Key Features:
- **Fair Play**: Powered by a smart contract, every game is transparent, ensuring outcomes are determined by an immutable algorithm.
- **Video Calls**: Bet above 2 ether and get the ability to video call your opponent, making the competition even more engaging.
- **NFT Badge System**: Win a game with a bet of at least 2 ether and earn unique badges. The more you collect, the higher your status on the platform.
- **Leaderboard & Chat**: Stay connected with a chat function powered by SendBird and keep track of the top players with our leaderboard.
- **User-Friendly Interface**: Dive into games, place bets, and connect with players seamlessly with our intuitive UI.

Join the XOwlPost-TicTacToe community today and embrace the thrill of blockchain-powered TicTacToe!

The repository for the project contains the source code for the smart contract and the front-end user interface, as well as deployment scripts and instructions for running the application locally.

### Deploying the TicTacToe Smart Contract

The `deploy_TicTacToe_contract.js` script facilitates the deployment of the TicTacToe smart contract onto the Ethereum blockchain. The script uses the `web3` library to interact with the Ethereum network and the `truffle-hdwallet-provider` to sign transactions.

#### How It Works

1. **Setup**:
    - The script begins by importing necessary libraries and initializing the `Web3` instance with a provider. The provider is set up using `truffle-hdwallet-provider`, which requires a mnemonic phrase for the deploying Ethereum account and an Infura endpoint URL. 
    - Replace 'your mnemonic phrase here' with your Ethereum account's mnemonic phrase and 'YOUR_INFURA_PROJECT_ID' with your specific Infura project ID.

2. **Deployment**:
    - The ABI (Application Binary Interface) and bytecode of the TicTacToe contract must be provided in the script.
    - The script then attempts to deploy the contract using the provided ABI and bytecode.

3. **Completion**:
    - Once the contract is successfully deployed, the script logs the Ethereum address where the contract has been deployed.

#### How to Use the Script

1. **Prerequisites**:
    - Ensure you have `web3` and `truffle-hdwallet-provider` installed.
    - Update the mnemonic phrase and Infura URL in the script.

2. **Provide Contract Details**:
    - Insert the ABI and bytecode for the Tic Tac Toe contract in the respective placeholders in the script.

3. **Run the Script**:
    - Execute the script using Node.js:
      ```bash
      node deploy_TicTacToe_contract.js
      ```

4. **Contract Address**:
    - Once the script completes execution, note down the contract address printed in the console. This is the address where your TicTacToe smart contract is now deployed.

---

For more details on how to contribute, please refer to our [Contributing Guide](./CONTRIBUTING.md).

This project is licensed under the MIT License. See the [LICENSE file](./LICENSE.md) for details.

