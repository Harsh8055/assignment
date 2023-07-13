// test/Treasury.test.js
const { expect } = require("chai");
const {utils} = require("ethers");
const { ethers } = require("hardhat");

describe("Treasury", function () {
  let treasury;
  let owner;
  let user1;
  let user2;
  let usdcToken;
  let mockProtocol;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();
    const Treasury = await ethers.getContractFactory("Treasury");

    const MockProtocol = await ethers.getContractFactory("MockProtocol");
    mockProtocol = await MockProtocol.deploy(100); // Set initial yield to 100


    const USDC = await ethers.getContractFactory("USDC");
    usdcToken = await USDC.deploy();

    console.log("usdcToken.address",await usdcToken.getAddress());
    console.log("usdcToken.address",mockProtocol.target, usdcToken.target, user1.address);

    // let array = [mockProtocol.target];
    treasury = await Treasury.deploy(mockProtocol.target,usdcToken.target);
    // await treasury.deploy();

  });

  it("should deposit USDC tokens into the treasury", async function () {
    const amount = 100000;
    let mint = await usdcToken.connect(user1).mint();
    await mint.wait();
    console.log("mint",mint);


    await usdcToken.connect(user1).approve(treasury.target, amount);
    await treasury.connect(user1).depositUSDC(amount);

    expect(await treasury.getBalance(user1.address)).to.equal(amount);
    expect(await treasury.getDeposits(user1.address)).to.equal(amount);
  });

  it("should withdraw USDC tokens from the treasury", async function () {
    const amount = 100000;
    let mint = await usdcToken.connect(user1).mint();
    await mint.wait();
  
    await usdcToken.connect(user1).approve(treasury.target, amount);
    await treasury.connect(user1).depositUSDC(amount);

    await treasury.connect(user1).withdrawUSDC(amount);

    expect(await treasury.getBalance(user1.address)).to.equal(0);
    expect(await treasury.getWithdrawals(user1.address)).to.equal(amount);
  });

  it("should calculate the aggregated yield", async function () {
    // Add test cases for calculating the aggregated yield
  });

  it("should swap funds to USDT in a liquidity pool", async function () {
    // Add test cases for swapping funds to USDT
  });

  it("should swap funds to DAI in a liquidity pool", async function () {
    // Add test cases for swapping funds to DAI
  });


});
