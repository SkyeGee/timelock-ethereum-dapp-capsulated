const TimeLockedWallet = artifacts.require ("TimeLockedWallet");
const GenerateTimeLockedWallet = artifacts.require ("GenerateTimeLockedWallet");

module.exports = function(deployer) { 

  // get the creator address
	const accounts = web3.eth.getAccounts();
	const creator = accounts[0];
  // get the owner address
  const owner = accounts[0];
  // get the unlock date
  const unlockDate = uint256;


  // Use deployer to state migration tasks.
  deployer.deploy(TimeLockedWallet, creator, owner, unlockDate);
  deployer.deploy(GenerateTimeLockedWallet);}
