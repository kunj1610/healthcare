// Import ethers library for Ethereum interactions
import { ethers } from "ethers";

// Import MetaMask provider detection utility
import detectEthereumProvider from "@metamask/detect-provider";

/**
 * Checks if MetaMask wallet is installed and accessible
 * @returns {boolean} True if wallet is detected, false otherwise
 */
function checkForWallet() {
  try {
    // Commented out provider detection using the imported utility
    // const provider = await detectEthereumProvider();
    
    // Check if ethereum object is injected by MetaMask or  not 
    if (typeof window.ethereum !== "undefined") {
      // From now on, this should always be true:
      // provider === window.ethereum
      return true; // initialize your app
    } else {
      // Log message if MetaMask is not installed
      console.log("Please install MetaMask!");
      return false; // Return false if MetaMask not found
    }
  } catch (err) {
    return false; // Return false if any error occurs during check
  }
}

/**
 * Initiates connection to MetaMask wallet
 * @returns {Promise} Resolves with success/failure status and message
 */
function connectMetaMask() {
  // Return a new Promise to handle async wallet connection
  return new Promise((resolve, reject) => {
    try {
      // Create Web3Provider instance using MetaMask's provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Request account access from user
      provider
        .send("eth_requestAccounts", [{ eth_accounts: {} }]) // prompt the user for account connections
        .then(() => {
          // Resolve promise with success message if connection established
          resolve({
            status: "success",
            message: "connected to metamask",
          });
        })
        .catch(() => {
          // Reject promise with error if user denies or connection fails
          reject({
            status: "failure",
            message: "there was a error connecting to the wallet",
          });
        });
    } catch (err) {
      // Reject promise if provider initialization fails
      reject({
        status: "failure",
        message: "there was an error connecting to provider",
      });
    }
  });
}

// Export functions for use in other modules
export { connectMetaMask, checkForWallet };
