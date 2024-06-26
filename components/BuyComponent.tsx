// import React from 'react'

// const BuyComponent = ({numberOfOrders}) => {
//   return (
//     <div>{numberOfOrders}</div>
//   )
// }

// export default BuyComponent

import React, { useEffect, useState } from 'react';
import Order from './Order';
import { useAccount, useReadContracts,useReadContract, useInfiniteReadContracts } from 'wagmi';
import {KEYSWAP_2_SC_ADDRESS} from '../constants/constants';
import {abi} from '../contracts/key_swap_2_abi';
const apiUrl = "https://api.cloudnouns.com/v1/pfp";



function  BuyComponent({numberOfOrders}) {

  const { address, isConnecting, isDisconnected } = useAccount();


  const { data, isError, isLoading } = useReadContracts({
      contracts: Array.from({ length: numberOfOrders }, (_, i) => ({
          address: `${KEYSWAP_2_SC_ADDRESS}`,
          abi:abi,
          functionName: 'getOrder',
          args: [i]
      }))
  });

  console.log(data)
  const [apiData, setApiData] = useState([]);
  
  useEffect(() => {
    console.log("data length" ,data?.length);
    setApiData([]);
    const updatedApiData = []
    for (let i = 0; i < data?.length; i++) {
      if (Number(data[i].result.price.toString()) == 0 || data[i].result.buyer != '0x0000000000000000000000000000000000000000') {
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
      
      updatedApiData.push(api)
    }
    setApiData(updatedApiData)
  },[data]);


  const pixelFontStyle = {
    fontFamily: 'Public Pixel', // Use the font-family name defined in your CSS
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Centered and blended-in menu tab */}
      <div className="bg-opacity-70 p-4 w-full h-full" >
        <h1 className="text-2xl font-bold mb-4 text-black">Available APIs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {console.log(apiData)}
        {apiData.map((item, index) => (
          <Order
            key={index}
            id = {item.id}
            name = {item.name}
            duration={item.duration}
            cost={item.cost}
            publicAddress={item.publicAddress}
            costPerHour={item.costPerHour}
            isSeller={item.isSeller}
            image={apiUrl+"?name="+item.publicAddress}
            isUpForSale={true}
          />
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default BuyComponent;
