const TimeLockedWallet = artifacts.require ("TimeLockedWallet");
const GenerateTimeLockedWallet = artifacts.require ("GenerateTimeLockedWallet");

module.exports = function(deployer) { 
    deployer.deploy(TimeLockedWallet, {});
  deployer.deploy(GenerateTimeLockedWallet);}