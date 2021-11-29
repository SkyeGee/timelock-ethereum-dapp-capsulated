// const TimeLockedWallet = artifacts.require ("TimeLockedWallet");
// const GenerateTimeLockedWallet = artifacts.require ("GenerateTimeLockedWallet");

// module.exports = function(deployer, accounts, uint256) { 

  
// //  const accounts = web3.eth.getAccounts();
// // // get the creator address
//    const _creator = accounts[0];
// //   // // get the owner address
//    const _owner = accounts[0];
// //   // // get the unlock date
//    const _unlockDate = uint256;

//   deployer.deploy(TimeLockedWallet, _creator, _owner, _unlockDate );
//   deployer.deploy(GenerateTimeLockedWallet);}

var GenerateTimeLockedWallet = artifacts.require("GenerateTimeLockedWallet");

module.exports = function(deployer) {
  deployer.deploy(GenerateTimeLockedWallet);
};
