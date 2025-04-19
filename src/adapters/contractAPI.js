// Import ethers library for Ethereum interactions
import { ethers } from "ethers";
// Import smart contract artifacts (currently commented out)
// import ElectronicHealthRecords from "../artifacts/contracts/ElectronicHealthRecords.sol/ElectronicHealthRecords.json"

// Contract address on the blockchain network
export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

/**
 * Requests user to connect their Ethereum account
 * Prompts MetaMask popup for account access
 */
export async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

/**
 * Initializes the smart contract instance
 * @returns {Object} Contains provider, contract instance and ABI
 * @returns {-1} If ethereum provider is not available
 */
export function initContract() {
  if (typeof window.ethereum !== "undefined") {
    // Create Web3Provider using MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Create contract instance
    const contract = new ethers.Contract(
      contractAddress,
      ElectronicHealthRecords.abi,
      provider
    );
    return { provider: provider, contract: contract, abi: ElectronicHealthRecords.abi };
  } else {
    return -1;
  }
}

/* 
 Example usage:
    // Import required functions
    import {contractAddress, requestAccount, initContract} from "/adapters/contractAPI"
    // Request account access
    requestAccount();
    // Initialize contract
    let result = initContract();
    // If initialization successful, call contract method
    if(result != 0) {
        const data = await result.Contract.greet();
        console.log('data : ', data); 
    }
*/
