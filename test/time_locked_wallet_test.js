const TimeLockedWalletTest = artifacts.require("TimeLockedWalletTest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TimeLockedWalletTest", function (/* accounts */) {
  it("should assert true", async function () {
    await TimeLockedWalletTest.deployed();
    return assert.isTrue(true);
  });
});
