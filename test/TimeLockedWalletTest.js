const TimeLockedWallet = artifacts.require("TimeLockedWallet");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
// contract("TimeLockedWalletTest", function (/* accounts */) {
//   it("should assert true", async function () {
//     await TimeLockedWalletTest.deployed();
//     return assert.isTrue(true);
//   });
// });
let ethToSend = web3.utils.toBN(1, "ether");
let someGas = web3.utils.toBN("0.01", "ether");
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
    })});