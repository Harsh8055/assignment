const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy USDC contract
  const USDC = await ethers.getContractFactory("USDC");
  const usdcToken = await USDC.deploy();

  // Deploy MockProtocol contract
  const MockProtocol = await ethers.getContractFactory("MockProtocol");
  const mockProtocol = await MockProtocol.deploy(100); // Set initial yield to 100

  // Deploy Treasury contract
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(mockProtocol.target, usdcToken.target);

  console.log("Contracts deployed:");
  console.log("USDC Token:", usdcToken.target);
  console.log("Mock Protocol:", mockProtocol.target);
  console.log("Treasury:", treasury.target);

 
  console.log("Deployment completed");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
