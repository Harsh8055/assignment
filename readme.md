## Treasury Smart Contract

The Treasury smart contract allows users to deposit and withdraw funds to/from different DeFi protocols and liquidity pools. It supports features such as allocation of funds, calculation of aggregated yield, and swapping funds between different assets.

### Contracts

#### Treasury.sol

The main contract that implements the treasury functionality.

##### Functions

###### `setProtocolAllocation(address protocol, uint256 allocation)`

Sets the allocation percentage for a specific protocol.

###### `updateProtocolAllocation(address protocol, uint256 newAllocation)`

Updates the allocation percentage for a specific protocol.

###### `withdrawFromProtocol(address protocol, uint256 amount)`

Withdraws funds from a specific protocol.

###### `depositUSDC(uint256 amount)`

Allows users to deposit USDC tokens into the treasury, distributing the funds among different protocols based on allocation ratios.

###### `withdrawUSDC(uint256 amount)`

Allows users to withdraw USDC tokens from the treasury, withdrawing proportional amounts from the allocated protocols.

###### `getBalance(address user)`

Returns the balance of a user in USDC tokens.

###### `getDeposits(address user)`

Returns the total deposited amount by a user in USDC tokens.

###### `getWithdrawals(address user)`

Returns the total withdrawn amount by a user in USDC tokens.

###### `calculateAggregatedYield()`

Calculates the aggregated percentage yield of all the protocols based on their allocation ratios.

###### `swapToUSDT(address liquidityPool, uint256 amount)`

Swaps funds to USDT in a specified liquidity pool.

###### `swapToDAI(address liquidityPool, uint256 amount)`

Swaps funds to DAI in a specified liquidity pool.

### Inheritance

The Treasury contract inherits from the `Ownable` contract of the OpenZeppelin library, which allows for access control and restricts certain functions to the contract owner only.


                        ┌──────────────────────────────────────┐
                        │             Treasury                 │
                        │              Contract                │
                        └─────────────────────┬────────────────┘
                                              │
                                              │
                    ┌───────────────┬──────────┴─────────────────┐
                    │   USDC Token  │          Aave              │
                    │    Contract   │        Protocol            │
                    └───────────────┼──────────┬─────────────────┘
                                    │          │
                      ┌─────────────┐ │┌────────┴───────┐
                      │Deposit USDC │ ││Withdraw USDC  │
                      └─────────────┘ │└────────┬───────┘
                                    │         │

