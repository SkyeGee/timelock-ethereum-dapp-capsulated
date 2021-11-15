// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract TimeLockedWallet {

    address public creator;
    address public owner;
    uint256 public unlockDate;
    uint256 public createdAt;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor (
        address _creator,
        address _owner,
        uint256 _unlockDate
     ) {
        creator = _creator;
        owner = _owner;
        unlockDate = _unlockDate;
        createdAt = block.timestamp;
    }

    // keep all the ether sent to this address
    fallback() external payable  { 
       emit Received(msg.sender, msg.value);
    }
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }



    // callable by owner only, after specified time
    function withdraw() onlyOwner public {
       require(block.timestamp >= unlockDate);
       //now send all the balance
       payable(msg.sender).transfer(address(this).balance);
       emit Withdrew(msg.sender, address(this).balance);
    }


    function info() public view returns(address, address, uint256, uint256, uint256) {
        return (creator, owner, unlockDate, createdAt, address(this).balance);
    }

    event Received(address from, uint256 amount);
    event Withdrew(address to, uint256 amount);
}
