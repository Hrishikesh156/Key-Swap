import * as React from 'react'
import { useWriteContract, BaseError, useWaitForTransactionReceipt } from 'wagmi' 
//import { abi } from '../contracts/read_abi' 
const sc = "0x0aF2a9Facf8083CeE66fa4c596bE3643561BA96D"
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"name": "TaskCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"name": "TaskCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "toggleCompleted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "taskCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tasks",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  

const Write_contract = () => {
    const { 
        data: hash, 
        isPending, 
        error,
        writeContract 
      } = useWriteContract()

      const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 
    // address: '0xb96B5cf4d1EDb261D22e4DBd7723CE914cb28c09'
      async function submit(e: React.FormEvent<HTMLFormElement>) { 
        e.preventDefault() 
        const formData = new FormData(e.target as HTMLFormElement) 
        const will = formData.get('will') as string
        const name = formData.get('name') as string
        writeContract({
          address: sc,
          abi,
          functionName: 'createTask',
          args: [will,name],
        })
      } 
  return (
    <div>write_contract
        <form onSubmit={submit}>
      <input name="will" placeholder="will" required />
      <input name="name" placeholder="name" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {error && ( 
        <div>Error: {(error as BaseError).shortMessage || error.message}</div> 
      )} 
        Mint 
        {isPending ? 'Confirming...' : 'Mint'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
    </form>
    </div>
  )
}

export default Write_contract