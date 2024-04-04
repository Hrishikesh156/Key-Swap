import React from 'react'
import { type BaseError, useReadContract } from 'wagmi'
import { abi } from '../contracts/key_swap_abi'
import { KEYSWAP_SC_ADDRESS } from '../constants/constants'
const ReadContract = () => {
 const {data: value,
    error, 
    isPending} = useReadContract({
        abi,
        address: KEYSWAP_SC_ADDRESS,
        functionName: 'getOrder',
        args: [0]
       
    })
    if (isPending) return <div>Loading...</div> 

  if (error) 
    return ( 
      <div> 
        Error: {(error).shortMessage || error.message} 
      </div> 
    )  
    console.log(value)
  return (
    <div>
        <h1>Value Stored in Smart Contract {value?.seller}</h1>
    </div>
  )
}

export default ReadContract