import 'dotenv/config'
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import { HardhatUserConfig, NetworksUserConfig } from "hardhat/types";
import { appChain, CHAINS } from "./chains";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const networks: NetworksUserConfig = {}

const chain = CHAINS[appChain];
let defaultNetwork = 'goerli'

defaultNetwork = chain.name.replaceAll(' ', '_').toLowerCase()
networks[defaultNetwork] = {
  url: chain.urls[0]??'',
  accounts: [process.env.DEPLOYER??'']
};

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: defaultNetwork,
  networks: networks,
  etherscan: {
    apiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY??"",
    customChains: [
      {
        network: defaultNetwork,
        chainId: appChain,
        urls: {
          apiURL: `${process.env.ETHERSCAN_API_BASE??''}/api`,
          browserURL: process.env.ETHERSCAN_API_BASE??''
        }
      }
    ]
  }
};

export default config;
