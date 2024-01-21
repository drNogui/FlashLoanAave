// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";
import "./FlashLoan.sol";

contract FlashLoanReceiver {
    FlashLoan private pool;
    address private owner; // the owner of the contract

    constructor(address _poolAddress) { 
        pool = FlashLoan(_poolAddress); // set the pool address
        owner = msg.sender; // set the owner of the contract
    }

    function startFlashLoan(uint256 _amount) external { // start the flash loan
        require(msg.sender == owner, "You aren't the owner"); // check if the sender is the owner of the contract
        pool.FlashLoan(_amount); // call the flash loan function in the pool contract
    }
}