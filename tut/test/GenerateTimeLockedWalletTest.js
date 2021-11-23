const TimeLockedWallet = artifacts.require("./TimeLockedWallet.sol");
const GenerateTimeLockedWallet = artifacts.require("./GenerateTimeLockedWallet.sol");

let ethToSend = web3.toWei(1, "ether");
let someGas = web3.toWei(0.01, "ether");
let GeneratetimeLockedWallet;
let creator;
let owner;
let timeLockedWalletAbi;

contract('GenerateTimeLockedWallet', (accounts) => {

    before(async () => {
        creator = accounts[0];
        owner = accounts[1];
        GenerateTimeLockedWallet = await GenerateTimeLockedWallet.new({from: creator});

    });

    it("Contract generator is working well", async () => {
        // Create the wallet contract.
        let now = Math.floor((new Date).getTime() / 1000);
        await GenerateTimeLockedWallet.newTimeLockedWallet(
            owner, now, {from: creator, value: ethToSend}
        );

        // Check if wallet can be found in creator's wallets.
        let creatorWallets = await GenerateTimeLockedWallet.getWallets.call(creator);
        assert(1 == creatorWallets.length);

        // Check if wallet can be found in owners's wallets.
        let ownerWallets = await GenerateTimeLockedWallet.getWallets.call(owner);
        assert(1 == ownerWallets.length);
        
        // Check if this is the same wallet for both of them.
        assert(creatorWallets[0] === ownerWallets[0]);
    });

});
