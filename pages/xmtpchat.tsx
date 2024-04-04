import React from 'react'
import XmtpHome from '../components/XmtpHome'
import { Wallet } from 'ethers'
import { Client } from "@xmtp/xmtp-js";
import useEthersWalletClient from '../hooks/useEthersWalletClient';
import { create } from 'domain';

const Xmtpchat = () => {

// const wallet = Wallet.createRandom();
// console.log("Wallet address: " + wallet.address);
// const { data, isLoading } = useEthersWalletClient();
// const signer = data;

// const createClient = async function () {
//   // Create the XMTP client
//   const xmtp = await Client.create(wallet, { env: "production" });
// console.log("Client created", xmtp.address);
// connectClinet(xmtp)
// }
// createClient(); 
// const connectClinet = async function (xmtp:any) {
//   // Connect the XMTP client
  
//   const WALLET_TO = "0x20B572bE48527a770479744AeC6fE5644F97678B";
// const isOnProdNetwork = await xmtp.canMessage(WALLET_TO);
// console.log("Can message: " + isOnProdNetwork);

// }
  return (
    <div>xmtpchat

<XmtpHome PEER_ADDRESS={"0x5891DbD48601a61F82D4326E1f1912ec17166815"} />
    </div>
  )
}

export default Xmtpchat