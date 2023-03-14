// SPDX-License-Identifier: MIT
// @title GuessTheNumber Contract
/// @author Patrick Sfeir
/// @notice A contract for guessing a secret number
/// @dev This contract uses SafeERC20, Ownable, and ReentrancyGuard
/// @version 1.0
// Date: 2023-03-02

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract GuessTheNumber is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using Math for uint256;
    uint256 private secretNumber;
    uint256 public contractBalance;
    uint256 lastInteractionTime; 
    IERC20 public token;
    event NumberGuessed(address indexed player, uint256 guess, uint256 winnings);
    event PaymentReceived(address indexed player, uint256 amount);
    event Loss(address indexed player, uint256 guess);
    error Lowbalance(string message, uint balance);
    error NoFunds(string message, uint funds);
    error InsufficientBalance(string message, uint balance);
    error Wrongrange (string message, uint number);
    error Wrongsecretnumber (string message);
    error Wrongramount (string message, uint Amount);
    error SecretNumberNotSet(string message);
    error WronglastInteraction(string message);
    error ownerrevert(string message);
    constructor(address _token) {
        token = IERC20(_token);
        lastInteractionTime = block.timestamp;  
    }
    function setSecretNumber(uint256 _number) public onlyOwner {
        if (_number < 100 && _number > 200) revert Wrongsecretnumber({message:"Number should be between 100-200"});
        require(_number > 99 && _number < 200, "Set secret number should be 100-200");
        // Generate a hash of the secret number using keccak256
        bytes32 hash = keccak256(abi.encode(_number));
        // Take the modulus of the hash with 100 to get a number between 0 and 99
        uint256 randomNumber = uint256(hash) % 100;
        // Add 100 to the result to get a number between 100 and 199
        secretNumber = randomNumber + 101;
    }

    function guess(uint256 guesss) public payable nonReentrant {
        //Pre-Conditions
        if (secretNumber == 0) revert SecretNumberNotSet({message:"Secret number has not been set yet"});
        if (msg.value  != 0.001 ether) revert InsufficientBalance({message:"Please pay the minimum amount",balance: msg.value});
        if (guesss < 100 || guesss > 200) revert Wrongrange({message:"Number should be between 100-200", number: guesss});
        //Action
        bytes32 guessHash = keccak256(abi.encode(guesss));
        uint256 guessNumber = (uint256(guessHash) % 100) + 101;
        emit PaymentReceived(msg.sender, msg.value);
        lastInteractionTime = block.timestamp; 
        // Update contract balance with incoming Ether
        contractBalance += msg.value;
        if (guessNumber == secretNumber) {
            uint256 winnings = Math.mulDiv(contractBalance, 8, 10);
            if (contractBalance <= winnings) revert NoFunds({message:"Insufficient balance in contract", funds: contractBalance});
            // Transfer winnings and update contract balance
            payable(msg.sender).transfer(winnings);
            contractBalance -= winnings;
            if (getContractBalance() < 100) revert Lowbalance({message:"balance is low",balance:  getContractBalance()});
            IERC20(token).safeTransfer(msg.sender, 100);
            secretNumber = 0;
            emit NumberGuessed(msg.sender, guesss, winnings);
        }
        else {
            emit Loss(msg.sender, guesss);
        }
    }
    function withdraw(uint256 _amount) public onlyOwner {
        if (block.timestamp < lastInteractionTime + 90 days) revert WronglastInteraction({message:"Last Interaction Time should +90 days"});
        if (_amount >= address(this).balance) revert Wrongramount({message:"Amount exceeds contract balance", Amount: _amount});
        // withdraw ETH
        payable(msg.sender).transfer(_amount);
        // withdraw ERC20 tokens
        uint256 tokenBalance = IERC20(token).balanceOf(address(this));
        if (tokenBalance > 0) IERC20(token).safeTransfer(msg.sender, tokenBalance);    
    }
    function getContractBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }
}

