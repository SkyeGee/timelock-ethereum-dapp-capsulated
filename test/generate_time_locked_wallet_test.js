const GenerateTimeLockedWalletTest = artifacts.require("GenerateTimeLockedWalletTest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("GenerateTimeLockedWalletTest", function (/* accounts */) {
  it("should assert true", async function () {
    await GenerateTimeLockedWalletTest.deployed();
    return assert.isTrue(true);
  });
});
