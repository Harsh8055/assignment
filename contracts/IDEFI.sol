pragma solidity ^0.8.0;

interface IDefiProtocol {
    function deposit(uint256 amount) external;
    function withdraw(uint256 amount) external;
    function getCurrentYield() external view returns (uint256);
    function getBalance() external view returns (uint256);
}

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function symbol() external view returns (string memory);
    function name() external view returns (string memory);
}

interface ILiquidityPool {
    function swapToUSDT(uint256 amount) external returns (uint256);
    function swapToDAI(uint256 amount) external returns (uint256);
    function swapToUSDC(uint256 amount) external returns (uint256);
}