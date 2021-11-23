const TimeLockedWallet = artifacts.require("./TimeLockedWallet.sol");

let ethToSend = web3.toWei(1, "ether");
let someGas = web3.toWei(0.01, "ether");
let creator;
let owner;

contract('TimeLockedWallet', (accounts) => {

    before(async () => {
        creator = accounts[0];
        owner = accounts[1];
        other = accounts[2];
    });

    it("Owner can withdraw the funds after the unlock date", async () => {
        //set unlock date in unix epoch to now
        let now = Math.floor((new Date).getTime() / 1000);
        //create the contract and load the contract with some eth
        let timeLockedWallet = await TimeLockedWallet.new(creator, owner, now);
        await TimeLockedWallet.send(ethToSend, {from: creator});
        assert(ethToSend == await web3.eth.getBalance(timeLockedWallet.address));
        let balanceBefore = await web3.eth.getBalance(owner);
        await timeLockedWallet.withdraw({from: owner});
        let balanceAfter = await web3.eth.getBalance(owner);
        assert(balanceAfter - balanceBefore >= ethToSend - someGas);
    });


    it("Nobody can withdraw the funds before the unlock date", async () => {
        //set unlock date in unix epoch to some future date
        let futureTime = Math.floor((new Date).getTime() / 1000) + 50000;

        //create the contract
        let timeLockedWallet = await TimeLockedWallet.new(creator, owner, futureTime);

        //load the contract with some eth
        await timeLockedWallet.send(ethToSend, {from: creator});
        assert(ethToSend == await web3.eth.getBalance(timeLockedWallet.address));
        try {
            await timeLockedWallet.withdraw({from: owner})
            assert(false, "Expected error not received");
        } catch (error) {} //expected

        try {
            await timeLockedWallet.withdraw({from: creator})
            assert(false, "Expected error not received");
        } catch (error) {} //expected

        try {
            await timeLockedWallet.withdraw({from: other})
            assert(false, "Expected error not received");
        } catch (error) {} //expected

        //contract balance is intact
        assert(ethToSend == await web3.eth.getBalance(timeLockedWallet.address));
    });

    it("Nobody other than the owner can withdraw funds after the unlock date", async () => {
        //set unlock date in unix epoch to now
        let now = Math.floor((new Date).getTime() / 1000);

        //create the contract
        let TimeLockedWallet = await TimeLockedWallet.new(creator, owner, now);

        //load the contract with some eth
        await TimeLockedWallet.send(ethToSend, {from: creator});
        assert(ethToSend == await web3.eth.getBalance(timeLockedWallet.address));
        let balanceBefore = await web3.eth.getBalance(owner);

        try {
          await timeLockedWallet.withdraw({from: creator})
          assert(false, "Expected error not received");
        } catch (error) {} //expected

        try {
          await timeLockedWallet.withdraw({from: other})
          assert(false, "Expected error not received");
        } catch (error) {} //expected

        //contract balance is intact
        assert(ethToSend == await web3.eth.getBalance(timeLockedWallet.address));
    });

    it("Allow getting info about the wallet", async () => {
        // Remember current time.
        let now = Math.floor((new Date).getTime() / 1000);
        // Set unlockDate to future time.
        let unlockDate = now + 100000;
        // Create new LockedWallet.
        let timeLockedWallet = await TimeLockedWallet.new(creator, owner, unlockDate);
        // Send ether to the wallet.        
        await timeLockedWallet.send(ethToSend, {from: creator});
        
        // Get info about the wallet. 
        let info = await timeLockedWallet.info();

        // Compare result with expected values.
        assert(info[0] == creator);
        assert(info[1] == owner);
        assert(info[2].toNumber() == unlockDate);
        assert(info[3].toNumber() == now);
        assert(info[4].toNumber() == ethToSend);
    });

});