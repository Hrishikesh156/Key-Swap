import React from 'react'
import { useAccount, useReadContract } from 'wagmi'
import WalletNotConnected from '../components/WalletNotConnected'
import BuyComponent from '../components/BuyComponent'
import {KEYSWAP_2_SC_ADDRESS} from '../constants/constants';
import {abi} from '../contracts/key_swap_2_abi';
import Navbar from '../components/Navbar';

const Buy = () => {
  const { data, isError, isLoading } = useReadContract({
    address: KEYSWAP_2_SC_ADDRESS,
    abi,
    functionName: 'getOrderNextNumber',
  })

  console.log(data)
  const { address, isConnecting, isDisconnected } = useAccount()

  if (isDisconnected || isConnecting) return (<div><WalletNotConnected/></div>)

  return (
    <>
    <div className="text-white">
        <Navbar />
      </div>
      <div className="flex flex-col justify-center items-center text-black p-8">
        <h1 className="text-5xl font-bold mt-24 mb-16">Pay for Web APIs using crypto</h1>
        <p className="text-center">You can buy API access at different rates given here. Once you click on buy, make sure the seller sends you the API key in under an hour through XMTP</p>
      </div>

     {data ?

      <BuyComponent
      numberOfOrders={Number(data)}
      />
      : " No Data found!!"
    }
     </>
  )
}

export default Buy

// import React from 'react'

// const Buy = () => {
//   return (
//     <div>Buy</div>
//   )
// }

// export default Buy