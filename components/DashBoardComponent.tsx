/*
Your current transactions:
Seller:
List of items:{public address of buyer, image, duration, and money collected, button with CANCEL transaction}

Buyer:
List of itemsl {public address of seller, image, duration, and money spent, button with CANCEL transaction}
*/

// Compare this snippet from frontend/src/components/Orders.js:



import React from 'react';
import Order from '../components/Order'; // Assuming the Order component is in the same directory
import WalletNotConnected from '../components/WalletNotConnected'
import ethers from 'ethers'
import { useAccount, useContractRead, useContractWrite, useReadContracts } from 'wagmi';
import {KEYSWAP_2_SC_ADDRESS} from '../constants/constants';
import {abi} from '../contracts/key_swap_2_abi';
import { useEffect, useState } from 'react';

const DashboardComponent = ({numberOfOrders}) => {
const { address, isConnecting, isDisconnected } = useAccount()
const apiUrl = "https://api.cloudnouns.com/v1/pfp";


  const { data, isError, isLoading } = useReadContracts({
    contracts: Array.from({ length: numberOfOrders }, (_, i) => ({
        address: `${KEYSWAP_2_SC_ADDRESS}`,
        abi:abi,
        functionName: 'getOrder',
        args: [i]
    }))
});
  const [apiDataSold, setApiDataSold] = useState([]);
  const [apiDataBought, setApiDataBought] = useState([]);
    console.log(data)
  useEffect(() => {
    console.log(data);
    setApiDataBought([]);
    setApiDataSold([]);

    const updatedBoughtApiData = []
    for (let i = 0; i < data?.length; i++) {
      if (data[i].result.price == 0 || Number(data[i].result.buyer) != address) {
        console.log("Nah..." + data[i].result.buyer.toString() + " " + address.toString())
        continue;
      }
      let api = {
        name: data[i].result.name, 
        id: i,
        duration: Number(data[i].result.duration),
        cost: Number(data[i].result.price),
        publicAddress: data[i].result.seller,
        costPerHour: Number(data[i].result.price)/(Number(data[i].result.duration) ),
        isSeller: 0,
        image: 'https://api.cloudnouns.com/v1/pfp',
        isUpForSale: true,
      }
      updatedBoughtApiData.push(api)
      
    }
    setApiDataBought(updatedBoughtApiData)
    console.log("bought",apiDataBought)

    const updatedSoldApiData = []
    for (let i = 0; i < data?.length; i++) {
      if (data[i].result.price == 0 || Number(data[i].result.seller) != address || data[i].result.buyer == '0x0000000000000000000000000000000000000000') {
        // console.log("Nah..." + data[i].result.buyer.toString() + " " + address.toString())
        continue;
      }
      let api = {
        name: data[i].result.name,
        id: i,
        duration: Number(data[i].result.duration),
        cost: Number(data[i].result.price),
        publicAddress: data[i].result.buyer,
        costPerHour: Number(data[i].result.price)/(Number(data[i].result.duration) ),
        isSeller: 0,
        image: 'https://api.cloudnouns.com/v1/pfp',
        isUpForSale: true,
      }
      updatedSoldApiData.push(api)
      
    }
    setApiDataSold(updatedSoldApiData)
    console.log("Sold",apiDataSold)
  }, [data]);



  if (isDisconnected || isConnecting) return (<div><WalletNotConnected/></div>)

  return (
<div>
  <div className="flex flex-col justify-center items-center text-blue-700">
    <h1 className="text-6xl font-bold mt-24 mb-16">Dashboard</h1>
    <p className="text-center text-2xl mb-10">Here's a list of all your current transactions!</p>
  </div>


  <h3 className="text-2xl font-semibold mb-4 border-b-2 border-gray-300 pb-2 text-blue-700 text-center">Items being sold:</h3>
  <div className="my-8 flex w-1/2">

    {apiDataSold.length === 0 ? (
      <p className="text-xl text-blue-700 italic">Looks like you have no sell transactions currently running.</p>
    ) : (
      apiDataSold.map((item, index) => (
        <Order
          id = {item.id}
          key={index}
          name = {item.name}
          duration={item.duration}
          cost={item.cost}
          publicAddress={item.publicAddress}
          costPerHour={item.costPerHour}
          isSeller={item.isSeller}
          image={apiUrl+"?name="+item.publicAddress}
          isUpForSale={false}
        />
      ))
    )}
  </div>


  <h3 className="text-2xl font-semibold mb-4 border-b-2 border-gray-300 pb-2 text-blue-700 text-center">Items being bought:</h3>
  <div className="mt-12  flex w-1/2">

    {apiDataBought.length === 0 ? (
      <p className="text-xl text-blue-700 italic">Looks like you have no buy transactions currently running.</p>
    ) : (
      apiDataBought.map((item, index) => (
        <Order
          id = {item.id}
          key={index}
          name = {item.name}
          duration={item.duration}
          cost={item.cost}
          publicAddress={item.publicAddress}
          costPerHour={item.costPerHour}
          isSeller={item.isSeller}
          image={apiUrl+"?name="+item.publicAddress}
          isUpForSale={false}
        />
      ))
    )}
  </div>
</div>


  );
}

export default DashboardComponent;
