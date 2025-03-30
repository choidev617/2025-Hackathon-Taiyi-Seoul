const hre = require("hardhat");

async function main() {
  // 1. Contract Factory 가져오기
  const VehicleNFTFactory = await hre.ethers.getContractFactory("VehicleNFT");

  // 2. 배포하기 (deploy 함수는 Contract 객체를 반환함)
  const vehicleNFT = await VehicleNFTFactory.deploy();

  // 3. 실제로 블록에 포함될 때까지 대기
  await vehicleNFT.waitForDeployment();

  // 4. 배포 주소 출력
  console.log(`🚗 VehicleNFT deployed to: ${await vehicleNFT.getAddress()}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});