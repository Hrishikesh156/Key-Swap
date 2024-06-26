import React from 'react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal } from '@web3modal/react'
import { useAccount, configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import Profile from './Profile'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import styles from '../styles/Home.module.css';

// const chains = [arbitrum, mainnet, polygon] // -----CHANGE-----
// const projectId = '02d2c608e74734322e276800f3e43483' // -----HIDE-----

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient
// })
// const ethereumClient = new EthereumClient(wagmiConfig, chains)
// const apiUrl = "https://api.cloudnouns.com/v1/pfp";

function Navbar() {
  const pixelFontStyle = {
    fontFamily: 'Public Pixel', // Use the font-family name defined in your CSS
  };
  return (
    <>
      <div className="p-4 flex justify-between items-center bg-white">
        {/* Left Side */}
        <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
          <li>
             <a href="/" className="mt-2">
             <img
              src="https://res.cloudinary.com/dbqqvw3gf/image/upload/v1701611498/ETH-India/word-logo1_humlnj.jpg"
              className="h-16"
            /></a> 
           
          </li>
          <li className='flex cursor-pointer items-center justify-between gap-3 hover:text-blue-700'>
            <a href="/buy" className="text-black text-lg hover:text-gray-400 px-3 py-2" style={pixelFontStyle}>Buy</a>
          </li>
          <li>
            <a href="/sell" className="text-black text-lg hover:text-gray-400 px-3 py-2" style={pixelFontStyle}>Sell</a>
          </li>
          <li>
            <a href="/dashboard" className="text-black text-lg hover:text-gray-400 px-3 py-2" style={pixelFontStyle}>Dashboard</a>
          </li>
          {/* <li>
            <a href="/graph" className="text-black hover:text-gray-400 px-3 py-2" style={pixelFontStyle}>Analytics</a>
          </li> */}
        </ul>

        {/* Right Side */}
        <ul className="flex items-center space-x-2 list-none">
          {/* Move Wallet Connect here */}
          <li>
            <div className="flex items-center space-x-2">
              {/* <WagmiConfig config={wagmiConfig}>
                <Web3Button />
              </WagmiConfig>
              <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
                 <ConnectButton />
    
            </div>
          </li>
          
        </ul>
      </div>
    </>
  )
}

export default Navbar