// Import the DoctorRegistry contract artifact.
const DoctorRegistry = artifacts.require("DoctorRegistry");

// Export the deployment function
module.exports = function (deployer) {
  // Deploy the DoctorRegistry contract
  deployer.deploy(DoctorRegistry);
};
