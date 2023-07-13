pragma solidity ^0.8.0;


import "./IDEFI.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Treasury is Ownable {
    mapping(address => uint256) private balances;
    mapping(address => uint256) private deposits;
    mapping(address => uint256) private withdrawals;

    address usdcToken; //0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e
    address[] private protocols;
    mapping(address => uint256) private protocolAllocations;

    constructor(address protocol, address _usdcToken) {
        usdcToken = _usdcToken;
        protocols.push(protocol);
    }
     function setProtocolAllocation(address protocol, uint256 allocation) external onlyOwner {
        protocolAllocations[protocol] = allocation;
    }
    
    function updateProtocolAllocation(address protocol, uint256 newAllocation) external onlyOwner {
        require(protocolAllocations[protocol] > 0, "Protocol allocation does not exist");
        protocolAllocations[protocol] = newAllocation;
    }
    
    function withdrawFromProtocol(address protocol, uint256 amount) external onlyOwner {
        IDefiProtocol(protocol).withdraw(amount);
        // Additional logic for handling the withdrawn funds
    }
    

    function depositUSDC(uint256 amount) external {
        
        require(IERC20(usdcToken).transferFrom(msg.sender, address(this), amount), "Failed to transfer USDC");
        
        balances[msg.sender] += amount;
        deposits[msg.sender] += amount;
        
        // Distribute the funds among different protocols based on allocation ratios
        for (uint256 i = 0; i < protocols.length; i++) {
            address protocol = protocols[i];
            uint256 allocation = protocolAllocations[protocol];
            uint256 protocolAmount = amount * allocation / 100;
            
            IERC20(usdcToken).transfer(protocol, protocolAmount);
            
            // Deposit funds into the protocol
            IDefiProtocol(protocol).deposit(protocolAmount);
        }
    }
    
    function withdrawUSDC(uint256 amount) external {
        require(amount <= balances[msg.sender], "Insufficient balance");
        
        
        balances[msg.sender] -= amount;
        withdrawals[msg.sender] += amount;
        
        // Withdraw funds from the protocols
        for (uint256 i = 0; i < protocols.length; i++) {
            address protocol = protocols[i];
            uint256 protocolAmount = amount * protocolAllocations[protocol] / 100;
            
            IDefiProtocol(protocol).withdraw(protocolAmount);
            
            // Additional logic for handling the withdrawn funds
        }
        
        require(IERC20(usdcToken).transfer(msg.sender, amount), "Failed to transfer USDC");
    }
    
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
    
    function getDeposits(address user) external view returns (uint256) {
        return deposits[user];
    }
    
    function getWithdrawals(address user) external view returns (uint256) {
        return withdrawals[user];
    }
    
    function calculateAggregatedYield() external view returns (uint256) {
        uint256 totalAllocation = 0;
        uint256 weightedYield = 0;
        
        for (uint256 i = 0; i < protocols.length; i++) {
            address protocol = protocols[i];
            uint256 allocation = protocolAllocations[protocol];
            uint256 yield = IDefiProtocol(protocol).getCurrentYield();
            
            totalAllocation += allocation;
            weightedYield += allocation * yield;
        }
        
        if (totalAllocation > 0) {
            return weightedYield / totalAllocation;
        } else {
            return 0;
        }
    }


       // Example function for swapping funds to USDT in a liquidity pool
    function swapToUSDT(address liquidityPool, uint256 amount) external onlyOwner {
        ILiquidityPool(liquidityPool).swapToUSDT(amount);
        // Additional logic for handling the swapped funds
    }
    
    // Example function for swapping funds to DAI in a liquidity pool
    function swapToDAI(address liquidityPool, uint256 amount) external onlyOwner {
        ILiquidityPool(liquidityPool).swapToDAI(amount);
        // Additional logic for handling the swapped funds
    }


}
