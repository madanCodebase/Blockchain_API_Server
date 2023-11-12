// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {

    const fidere = await hre.ethers.getContractFactory("fidere");

  // Deploy the contract
  console.log('Deploying fidere...');
  const fidereToken = await fidere.deploy();
  await fidereToken.waitForDeployment();
  console.log(`fidere deployed to: ${fidereToken.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });