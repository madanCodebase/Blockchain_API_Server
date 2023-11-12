const hre = require("hardhat");
const ContractJson = require("../artifacts/contracts/fidere.sol/fidere.json");

const recAddr = "0x657F262C9C8d76959a76F5693CdA4548bff5e413";

async function main() {
    try {
        const abi = ContractJson.abi;

        // Initialize Alchemy Provider
        const alchemy = new hre.ethers.AlchemyProvider(
            'maticmum', // Network name
            process.env.ALCHEMY_API_KEY
        );

        // Initialize User Wallet
        const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

        // Get the deployed contract instance
        const fidere = new hre.ethers.Contract(
            process.env.FIDERE_CONTRACT_ADDRESS, // Contract address
            abi,
            userWallet
        );

        const tranferTokenCount = hre.ethers.parseEther('1'); // 1 Ether converted to Wei

        console.log('User address:', userWallet.address);
        console.log('Token sending:', tranferTokenCount.toString(), 'Wei');

        // Perform Token Transfer
        const reply = await fidere.transfer(recAddr, tranferTokenCount);

        console.log('Transaction reply:', reply);

        console.log('Transaction done');
        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
