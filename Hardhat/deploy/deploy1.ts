import fs from "fs";
import { Wallet, utils, Provider, Web3Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
//import ERC20ABI from '../ERC20ABI.json';
//import GameABI from '../GameABI.json';

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the ERC20 contract`);

  // Initialize the wallet.
  const PRIV_KEY = fs.readFileSync(".secret").toString()
  const provider = new Provider("ALCHEMY/INFURA_RPC_URL");
  const wallet = new Wallet(PRIV_KEY, provider);

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("MyToken");

  // Estimate contract deployment fee
  const deploymentFee = await deployer.estimateDeployFee(artifact, []);

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const erc20Contract = await deployer.deploy(artifact, []);

  // Show the contract info.
  const contractAddress = erc20Contract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);



  const Arti = await deployer.loadArtifact("GuessTheNumber");
  const deploymentFee2 = await deployer.estimateDeployFee(Arti, [contractAddress]);

  const parsedFee2 = ethers.utils.formatEther(deploymentFee2.toString());
  console.log(`The deployment is estimated to cost ${parsedFee2} ETH`);

  const GameContract = await deployer.deploy(Arti, [contractAddress]);

  const contract2Address = GameContract.address;
  console.log(`${Arti.contractName} was deployed to ${contract2Address}`);

 
}
