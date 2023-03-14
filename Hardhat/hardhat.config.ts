import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";

module.exports = {
  zksolc: {
    version: "1.3.1",
    compilerSource: "binary",
    settings: {},
  },
  defaultNetwork: "zkSyncTestnet",

  networks: {
    zkSyncTestnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "https://eth-goerli.g.alchemy.com/v2/LSafSFiRUpOGZNpG2HBO3S-9Sub8ecD1", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
      verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification'
    },
  },
  etherscan: {
    apiKey: 'TAPTS6ISEPBIJBJP58JPDI4RZR5RIVEH3N',
  },
  solidity: {
    version: "0.8.17",
  },
};
