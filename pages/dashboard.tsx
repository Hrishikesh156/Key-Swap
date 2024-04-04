import React from 'react';
import Order from '../components/Order';
import WalletNotConnected from '../components/WalletNotConnected'
import ethers from 'ethers'
import { useAccount, useReadContract, useContractWrite, useContractReads } from 'wagmi';
import {KEYSWAP_SC_ADDRESS} from '../constants/constants';
import {abi} from '../contracts/key_swap_abi';
import { useEffect, useState } from 'react';
import DashboardComponent from '../components/DashBoardComponent';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { address, isConnecting, isDisconnected } = useAccount()

  const { data, isError, isLoading } = useReadContract({
    address: KEYSWAP_SC_ADDRESS,
    abi,
    functionName: 'getOrderNextNumber',
  })
  console.log(data)

  if (isDisconnected || isConnecting) return (<div><WalletNotConnected/></div>)

  return (
    <div>
        <div className="text-white">
        <Navbar />
      </div>
      <DashboardComponent
      numberOfOrders={Number(data)}
      />
    </div>
  );
}

export default Dashboard;
