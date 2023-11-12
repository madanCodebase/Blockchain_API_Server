const hre = require("hardhat");

async function main() {
  const AstralNet_FreeTrial = await hre.ethers.getContractFactory("AstralNet_FreeTrial");
  const astralNetContract = await AstralNet_FreeTrial.deploy();

  await astralNetContract.waitForDeployment();

  console.log("AstralNet_FreeTrial deployed to:", astralNetContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
