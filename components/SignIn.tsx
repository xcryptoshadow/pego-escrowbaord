import Image from 'next/future/image'
import LogoImage from "../images/logo.png"
import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
// import Web3 from "web3";
import {
    Avalanche,
    BSC,
    BSCTestnet,
    Ethereum,
    EthereumGoerli,
    KCCTestnet,
    Moonbeam,
    Moonriver,
    Optimism,
    PlatON,
    Polygon,
    Solana,
} from '@particle-network/common';
import { evmWallets, solanaWallets } from '@particle-network/connect';
import { ModalProvider } from '@particle-network/connect-react-ui';
import '@particle-network/connect-react-ui/esm/index.css';

import '@particle-network/connect-react-ui/dist/index.css';
import { ConnectButton } from '@particle-network/connect-react-ui';

const particle = new ParticleNetwork({
  projectId: "eacec95d-75e6-4ca0-980a-aceb60ca1fc8",
  clientKey: "c24GPFf10dVpqGLWLMlTaMHeoG0jH3IkZN99ydX7",
  appId: "4ab0d620-d610-4437-a50d-9f462c04851a",
  chainName: "Ethereum", //optional: current chain name, default Ethereum.
  chainId: 1, //optional: current chain id, default 1.
  wallet: {   //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
    displayWalletEntry: true,  //show wallet entry when connect particle.
    defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
    uiMode: "dark",  //optional: light or dark, if not set, the default is the same as web auth.
    supportChains: [{ id: 1287, name: "MoonBeam"}, { id: 5, name: "Ethereum"}], // optional: web wallet support chains.
    customStyle: {}, //optional: custom wallet style
  },
  securityAccount: { //optional: particle security account config
    //prompt set payment password. 0: None, 1: Once(default), 2: Always
    promptSettingWhenSign: 1,
    //prompt set master password. 0: None(default), 1: Once, 2: Always
    promptMasterPasswordSettingWhenLogin: 1
  },
});

const particleProvider = new ParticleProvider(particle.auth);


// //if you use web3.js
// window.web3 = new Web3(particleProvider);
// window.web3.currentProvider.isParticleNetwork // => true

//if you use ethers.js
import { ethers } from "ethers";
import { Component } from 'react';
const ethersProvider = new ethers.providers.Web3Provider(particleProvider, "any");
const ethersSigner = ethersProvider.getSigner();

export const SignIn = ({ logIn }: any) => {
    return (
        <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-lg-4 col-md-6">
                <div className="login-card">
                    <Image className="logo" src={LogoImage} width={100} height={100} alt={process.env.NEXT_PUBLIC_APP_NAME??'EscrowBoard'}/>
                    <h3>LogIn To Access</h3>
                    <button
                        className="btn btn-warning btn-lg w-100"
                        onClick={logIn}
                    >
                        Sign In
                    </button>
                  
                    {/* <h3>Or</h3>
                <ModalProvider
                    walletSort={['Particle Auth', 'Wallet']}
                    particleAuthSort={[
                        'email',
                        'phone',
                        'google',
                        'apple',
                        'facebook',
                        'microsoft',
                        'linkedin',
                        'github',
                        'discord',
                    ]}
                    options={{
                        projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
                        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
                        appId: process.env.NEXT_PUBLIC_APP_ID as string,
                        chains: [
                            PlatON,
                            Optimism,
                            Moonbeam,
                            Moonriver,
                            Avalanche,
                            Polygon,
                            BSC,
                            Ethereum,
                            EthereumGoerli,
                            Solana,
                            BSCTestnet,
                            KCCTestnet,
                        ],
                        particleWalletEntry: {
                            displayWalletEntry: true,
                            defaultWalletEntryPosition: WalletEntryPosition.BR,
                            supportChains: [Moonriver, Moonbeam, EthereumGoerli],
                        },
                        wallets: [
                            ...evmWallets({
                                projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
                                showQrModal: false,
                            }),
                            ...solanaWallets(),
                        ],
                    }}
                    language="en"
                        theme={ 'light' }
                        
                    >
                                  <ConnectButton />
                
                </ModalProvider> */}
                </div>
            </div>
        </div>
    )
}