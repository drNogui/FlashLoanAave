// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract FlashLoan {
    Token public token;
    uint256 public poolBalance;


    constructor(address _token) {
        token = Token(_token);
    }

    function depositTokens (uint256 _amount) external { // deposit tokens into the contract
        require (_amount >= 0, "You don't have enough tokens to deposit"); // check if the sender has enough tokens to deposit
        token.transferFrom(msg.sender, address(this), _amount); // transfer tokens from the sender to the contract
        poolBalance += _amount; // add the amount to the pool balance
    }

    funtion FlashLoan (uint256 _borrowAmount) external { // flash loan function
        require (_borrowAmount <= poolBalance, "The pool doesn't have enough tokens to lend"); // check if the pool has enough tokens to lend
        token.transfer(msg.sender, _borrowAmount); // transfer tokens from the contract to the sender
        poolBalance -= _borrowAmount; // subtract the amount from the pool balance
    }

}