const hre = require("hardhat");
const ContractJson = require("../artifacts/contracts/Lock.sol/Greeter.json");


async function main() {
    const abi = ContractJson.abi;

    const alchemy = new hre.ethers.AlchemyProvider(
        'maticmum',
        process.env.ALCHEMY_API_KEY
    );

    const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);


    // Get the deployed contract. We need both the specific CONTRACT_ADDRESS
    const Greeter = new hre.ethers.Contract(
      
        process.env.CONTRACT_ADDRESS,
        abi,
        userWallet
    )

    console.log(Greeter)

   /* console.log("Initial: " + await Greeter.greet());

    const setTx1 = await Greeter.setGreeting("Testing smartContract: state_1");
    await setTx1.wait();
    console.log("Step1: " + await Greeter.greet());

    // The second transaction does the exact same thing with a new input.
    const setTx2 = await Greeter.setGreeting("Testing smartContract: state_2");
    await setTx2.wait();
    console.log("Step2: " + await Greeter.greet());*/

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });