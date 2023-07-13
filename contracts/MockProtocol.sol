// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// interface IDefiProtocol {
//     function deposit(uint256 amount) external;
//     function withdraw(uint256 amount) external;
//     function getCurrentYield() external view returns (uint256);
//     function getBalance(address user) external view returns (uint256);
// }

contract MockProtocol  {
    uint256 private currentYield;
    mapping(address => uint256) private balances;

    constructor(uint256 _currentYield) {
        currentYield = _currentYield;
    }

    function deposit(uint256 amount) external {
        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) external {
        require(amount <= balances[msg.sender], "Insufficient balance");
        balances[msg.sender] -= amount;
    }

    function getCurrentYield() external view returns (uint256) {
        return currentYield;
    }

    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    function setCurrentYield(uint256 newYield) external {
        currentYield = newYield;
    }
}
