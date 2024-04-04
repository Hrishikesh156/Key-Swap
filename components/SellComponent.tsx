// SellComponent.js
// SellComponent.js

import React, { useState } from 'react';
import { ethers } from 'ethers'; // Import ethers
import {KEYSWAP_2_SC_ADDRESS} from '../constants/constants';
import {abi} from '../contracts/key_swap_2_abi';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';



function SellComponent() {
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [apiName, setApiName] = useState('');

  const { address, isConnecting, isDisconnected } = useAccount();

  const { data, isError, isLoading } = useReadContract({
    address: KEYSWAP_2_SC_ADDRESS,
    abi,
    functionName: 'getOrderNextNumber',
  })

  const { writeContract } = useWriteContract()
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'duration':
        setDuration(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'apiName':
        setApiName(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(data.toString())
    writeContract({
        args: [apiName, price, duration],
        address: KEYSWAP_2_SC_ADDRESS,
        abi,
        functionName: 'sellMessage'})


  };
  const pixelFontStyle = {
    fontFamily: 'PixelFont', // Use the font-family name defined in your CSS
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
        <h1 className="text-2xl font-bold mb-4" style={pixelFontStyle}>Sell an Item</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-white text-sm font-bold mb-2"
              >
                Duration (in days):
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={duration}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-white text-sm font-bold mb-2"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="apiName"
                className="block text-white text-sm font-bold mb-2"
              >
                API Name:
              </label>
              <input
                type="text"
                id="apiName"
                name="apiName"
                value={apiName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Add more form fields as needed */}
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default SellComponent;


