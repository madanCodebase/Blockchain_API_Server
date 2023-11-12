const hre = require("hardhat");
const {Utils } = require("alchemy-sdk");
const ContractJson = require("../artifacts/contracts/Lock.sol/fidere.json");

async function main() {
    const abi = ContractJson.abi;

    const alchemy = new hre.ethers.provider.AlchemyProvider(
        'maticmum',
        process.env.ALCHEMY_API_KEY
    );

    const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

    const fidere_token = new hre.ethers.Contract(
        process.env.FIDERE_CONTRACT_ADDRESS,
        abi,
        userWallet
    )
    
}
