// Hardhat test for VehicleNFT + LoanContract + Marketplace + InsuranceRegistry
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VehicleNFT DeFi System", function () {
  let owner, user1, user2;
  let vehicleNFT, loanContract, marketplace, insurance;
  let stablecoin;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("StablecoinMock");
    stablecoin = await Token.deploy();
    await stablecoin.mint(user1.address, ethers.utils.parseEther("10000"));

    const VehicleNFT = await ethers.getContractFactory("VehicleNFT");
    vehicleNFT = await VehicleNFT.deploy();
    await vehicleNFT.deployed();

    const LoanContract = await ethers.getContractFactory("LoanContract");
    loanContract = await LoanContract.deploy(stablecoin.address, vehicleNFT.address);
    await loanContract.deployed();

    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(vehicleNFT.address);
    await marketplace.deployed();

    const InsuranceRegistry = await ethers.getContractFactory("InsuranceRegistry");
    insurance = await InsuranceRegistry.deploy(vehicleNFT.address);
    await insurance.deployed();
  });

  it("should mint a vehicle NFT with metadata", async function () {
    const tx = await vehicleNFT.connect(owner).mintVehicleNFT(
      user1.address,
      "ipfs://sample-uri",
      "VIN123",
      "Electric",
      "77.4 kWh",
      "2023",
      "10,000 km"
    );
    await tx.wait();

    expect(await vehicleNFT.ownerOf(0)).to.equal(user1.address);
    const info = await vehicleNFT.getVehicleInfo(0);
    expect(info.vin).to.equal("VIN123");
  });

  it("should allow loan request and repayment", async function () {
    await vehicleNFT.connect(owner).mintVehicleNFT(user1.address, "ipfs://uri", "VIN", "Electric", "70kWh", "2022", "5,000 km");

    await vehicleNFT.connect(user1).approve(loanContract.address, 0);
    await loanContract.connect(user1).requestLoan(0, ethers.utils.parseEther("1000"), ethers.utils.parseEther("50"), 86400);

    expect(await vehicleNFT.ownerOf(0)).to.equal(loanContract.address);

    await stablecoin.connect(user1).approve(loanContract.address, ethers.utils.parseEther("1050"));
    await loanContract.connect(user1).repayLoan(0);

    expect(await vehicleNFT.ownerOf(0)).to.equal(user1.address);
  });

  it("should list and buy NFT on the marketplace", async function () {
    await vehicleNFT.connect(owner).mintVehicleNFT(user1.address, "ipfs://uri", "VIN", "Electric", "70kWh", "2022", "5,000 km");

    await vehicleNFT.connect(user1).approve(marketplace.address, 0);
    await marketplace.connect(user1).listNFT(0, ethers.utils.parseEther("1"));

    await marketplace.connect(user2).buyNFT(0, { value: ethers.utils.parseEther("1") });
    expect(await vehicleNFT.ownerOf(0)).to.equal(user2.address);
  });

  it("should allow insurance registration and validation", async function () {
    await vehicleNFT.connect(owner).mintVehicleNFT(user1.address, "ipfs://uri", "VIN", "Electric", "70kWh", "2022", "5,000 km");

    await insurance.connect(user1).registerInsurance(0, 30 * 24 * 60 * 60);

    expect(await insurance.isInsured(0)).to.be.true;
  });
});

