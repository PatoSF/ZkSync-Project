
### Welcome to IQ Token Guessing Game! https://zksyncguessiq.on.fleek.co/
This project is a blockchain-based platform that consists of two smart contracts - an ERC20 contract and a game contract. The ERC20 contract was created using OpenZeppelin libraries and mints a total supply of 1 billion IQ tokens. The game contract, on the other hand, interacts with the ERC20 contract and allows users to play a guessing game.

The goal of the game is to guess the secret number between 100 and 200 by paying 0.01 ETH to play. If you guess the correct number, you'll win 80% of the contract's funds and 100 IQ tokens. If you guess incorrectly, your funds will be added to the contract's funds.

Wait a couple of seconds so the website can fully load.
Use the keys: W, A, S, D to navigate and LEFT, RIGHT, UP, DOWN errows to change the view.

### Usage
Install all dependencies using `npm i`.
Run the frontend project using `npm start` or `yarn start`. Please note that the website may have trouble loading on certain browsers, so we recommend using Brave.
To deploy the contracts, compile them first using `npx hardhat compile`.
Next, use `npx hardhat deploy-zksync` to deploy. For deployment, you'll need your private key, an RPC URL from a provider like Alchemy or Infura, and the specific network you want to deploy to.
Create a .seret file in the Hardhat directory and paste your private key. You can also use Dotenv to store all your private information.

After deploying, go to the artifacts and copy the ABI from the game.json file. Then, create a .json file in the frontend project and paste the ABI into it. We'll need the ABI and contract address to interact with the frontend.
To verify the contracts on zkscan, run `npx hardhat verify --network zkSyncTestnet <erc20 address>` and `npx hardhat verify --network zkSyncTestnet <game address> "erc20 address"`. The game contract takes the erc20 address as an argument for its constructor.

As the owner, you can transfer tokens from the ERC20 to the game contract and set the secret number for the game to start working on https://goerli.explorer.zksync.io/

To deploy the contracts on zksync Testnet you need some ETH. 
You can get some ETH on the Goerli testnet from Goerli faucets.
Then you can use the portal to transfer token from Goerli tesnet to zksync testnet https://portal.zksync.io/ 

### Improvements
1-Data on chain is visible so I wanted to hash to secret number to make it a little harder for users to guess the secret number.
The optimal way to do it is the use an Oracle, chainlink Vrf is the best random number generator.

2-Governance is really important. We don't want the owner to play the game using a seperate wallet and withdraw the funds. So we could've changed a business logic of the contract to avoid that.
We could've generated a random number using block.timestamp and block.difficulty without letting the owner set the secret number.

### Technologies Used
OpenZeppelin
Hardhat
ZkSync
React

### Deployment Script
The deployment is estimated to cost 0.00013916025 ETH
MyToken was deployed to 0x8f3c48e74D728488fa4E9dE1DA4A17Ce3aCC4c4F
The deployment is estimated to cost 0.001756355 ETH
GuessTheNumber was deployed to 0x766e93c4E0D092B423e8235563324372042cd124

ERC20 contract verification ID is: 4681
Game contract verification ID is: 4682




