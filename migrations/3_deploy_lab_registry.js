// Import the LabRegistry contract artifact
const LabRegistry = artifacts.require("LabRegistry");

// Export the deployment function
module.exports = function (deployer) {
  // Deploy the LabRegistry contract
  deployer.deploy(LabRegistry);
};
