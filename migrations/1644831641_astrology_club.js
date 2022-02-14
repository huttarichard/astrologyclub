let AstrologyClub = artifacts.require("AstrologyClub");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(AstrologyClub)
};
