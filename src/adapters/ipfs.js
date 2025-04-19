// Import required dependencies for IPFS interaction
import { create } from "ipfs-http-client";
import { BufferList } from "bl";

// Create IPFS client instance with Infura configuration
const ipfs = create({
  host: "ipfs.infura.io", // Infura IPFS host
  port: "5001", // Default IPFS port
  protocol: "https", // Using HTTPS protocol
});

// Function to add data to IPFS
export const addToIPFS = async (data) => {
  // Add the data to IPFS and get content identifier (CID)
  const { cid } = await ipfs.add(data);
  return new Promise((resolve, reject) => {
    // Return the CID as a string
    resolve(cid.toString());
  });
};

// Function to retrieve data from IPFS using a hash
export const getFromIPFS = async (hashToGet) => {
  // Iterate through the data chunks from IPFS
  for await (const data of ipfs.get(hashToGet)) {
    // Create a buffer list to store content
    const content = new BufferList();
    // Collect all chunks of the content
    for await (const chunk of data.content) {
      content.append(chunk);
    }
    // Log and return the assembled content as string
    console.log(content.toString());
    return content.toString();
  }
};
