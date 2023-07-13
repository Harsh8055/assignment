// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockLiquidityPool {
    address private usdtToken;
    address private daiToken;
    address private usdcToken;

    constructor(address _usdtToken, address _daiToken, address _usdcToken) {
        usdtToken = _usdtToken;
        daiToken = _daiToken;
        usdcToken = _usdcToken;
    }

    function swapToUSDT(uint256 amount) external {
        IERC20(usdcToken).transferFrom(msg.sender, address(this), amount);
        IERC20(usdtToken).transfer(msg.sender, amount);
    }

    function swapToDAI(uint256 amount) external {
        IERC20(usdcToken).transferFrom(msg.sender, address(this), amount);
        IERC20(daiToken).transfer(msg.sender, amount);
    }

    function swapToUSDC(uint256 amount) external {
        IERC20(usdtToken).transferFrom(msg.sender, address(this), amount);
        IERC20(usdcToken).transfer(msg.sender, amount);
    }
}
