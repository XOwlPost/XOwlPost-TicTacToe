const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'your mnemonic phrase here';
const infuraUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID';

const provider = new HDWalletProvider(mnemonic, infuraUrl);
const web3 = new Web3(provider);

const abi = // insert the ABI for the Tic Tac Toe contract here
const bytecode = // insert the bytecode for the Tic Tac Toe contract here

const contract = new web3.eth.Contract(abi);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await contract.deploy({
    data: bytecode
  }).send({
    from: accounts[0],
    gas: '3000000'
  });

  console.log('Contract deployed to', result.options.address);
}

deploy();
