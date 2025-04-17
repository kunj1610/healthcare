const LabRegistry = artifacts.require("LabRegistry");

module.exports = function (deployer) {
  deployer.deploy(LabRegistry);
};
