const express = require('express');
const cors = require('cors'); 
const app = express();
const ContractJson = require('../artifacts/contracts/test_contract.sol/AstralNet_FreeTrial.json');
const Fidere_ContractJson = require('../artifacts/contracts/fidere.sol/fidere.json');
require('dotenv').config();
const hre = require("hardhat");


app.use(cors()); // Use the cors middleware

const contractAddress = process.env.AstralNet_FreeTrial_Contract_Addrs;
const contractAbi = ContractJson.abi;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const Fidere_ContractAbi = Fidere_ContractJson.abi

const alchemy = new hre.ethers.AlchemyProvider('maticmum', ALCHEMY_API_KEY);
const userWallet = new hre.ethers.Wallet(PRIVATE_KEY, alchemy);

const freeTrialContract = new hre.ethers.Contract(contractAddress, contractAbi, userWallet);
const FidereContractID = process.env.FIDERE_CONTRACT_ADDRESS;

app.use(express.json());

// Function to create a new contract
app.post('/new-contract', async (req, res) => {
    const {userName, userBio, userdPeerId, freeTrialDays, storageSizeAllowed, accountState, userWalletAddrs, freeFidereClaim } = req.body;
    console.log(req.body)
    try {
        const newContract = await freeTrialContract.NewAstralNetContract(userName, userBio, userdPeerId, freeTrialDays, storageSizeAllowed, accountState, userWalletAddrs, freeFidereClaim);
        console.log('New AstralNet contract created:', newContract);
        res.json(newContract);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

// Route to update user's wallet address using Peer ID
app.post('/update-user-wallet/:userdPeerId/:newWalletAddress', async (req, res) => {
    const { userdPeerId, newWalletAddress } = req.params;
    console.log(req.params)
    try {
        const tx = await freeTrialContract.updateUserWalletAddressByPeerId(userdPeerId, newWalletAddress);
        await tx.wait();
        console.log(`User with Peer ID ${userdPeerId} wallet address updated to ${newWalletAddress}`);
        res.send(`User with Peer ID ${userdPeerId} wallet address updated to ${newWalletAddress}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});


// Route to update user's name using Peer ID
app.post('/update-user-name/:userdPeerId/:newUserName', async (req, res) => {
    const { userdPeerId, newUserName } = req.params;
    console.log(req.params)
    try {
        const tx = await freeTrialContract.updateUserNameByPeerId(userdPeerId, newUserName);
        await tx.wait();
        console.log(`User with Peer ID ${userdPeerId} name updated to ${newUserName}`);
        res.send(`User with Peer ID ${userdPeerId} name updated to ${newUserName}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

// Route to update user's bio using Peer ID
app.post('/update-user-bio/:userdPeerId/:newUserBio', async (req, res) => {
    console.log(req.params)
    const { userdPeerId, newUserBio } = req.params;
    try {
        const tx = await freeTrialContract.updateUserBioByPeerId(userdPeerId, newUserBio);
        await tx.wait();
        console.log(`User with Peer ID ${userdPeerId} bio updated to ${newUserBio}`);
        res.send(`User with Peer ID ${userdPeerId} bio updated to ${newUserBio}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

// Route to update user's Fidere claim status using Peer ID
app.post('/update-fidere-claim/:userdPeerId/:newFidereClaim', async (req, res) => {
    console.log(req.params)
    const { userdPeerId, newFidereClaim } = req.params;
    try {
        const tx = await freeTrialContract.updateFreeFidereClaimByPeerId(userdPeerId, newFidereClaim === 'true');
        await tx.wait();
        console.log(`User with Peer ID ${userdPeerId} Fidere claim updated to ${newFidereClaim}`);
        res.send(`User with Peer ID ${userdPeerId} Fidere claim updated to ${newFidereClaim}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});


// Route to update storage size allowed using Peer ID
app.post('/update-storage-size/:userdPeerId/:newStorageSizeAllowed', async (req, res) => {
    const { userdPeerId, newStorageSizeAllowed } = req.params;
    console.log(req.params)
    try {
        const tx = await freeTrialContract.updateStorageSizeAllowedByPeerId(userdPeerId, newStorageSizeAllowed);
        await tx.wait();
        console.log(`User with Peer ID ${userdPeerId} storage size allowed updated to ${newStorageSizeAllowed}`);
        res.send(`User with Peer ID ${userdPeerId} storage size allowed updated to ${newStorageSizeAllowed}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

// Route to update account state using Peer ID
app.post('/update-account-state/:userdPeerId/:newAccountState', async (req, res) => {
    const { userdPeerId, newAccountState } = req.params;
    console.log(req.params)
    try {
        const tx = await freeTrialContract.updateAccountStateByPeerId(userdPeerId, newAccountState === 'true');
        await tx.wait();
        console.log(`User with Peer ID ${userdPeerId} account state updated to ${newAccountState}`);
        res.send(`User with Peer ID ${userdPeerId} account state updated to ${newAccountState}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

// Route to get user details using Peer ID
app.get('/get-user-details/:userdPeerId', async (req, res) => {
    const { userdPeerId } = req.params;
    console.log(req.params)
    try {
        const userDetails = await freeTrialContract.getUserContractDetailsByPeerId(userdPeerId);

        const serializedUserDetails = {
            userName: userDetails[0],
            userBio: userDetails[1],
            userdPeerId: userDetails[2],
            freeTrialDays: userDetails[3].toString(),
            storageSizeAllowed: userDetails[4].toString(),
            timeStamp: userDetails[5].toString(),
            accountState: userDetails[6],
            userWalletAddrs: userDetails[7],
            freeFidereClaim: userDetails[8],
            userNo: userDetails[9].toString(),
        };

        console.log(`User with Peer ID ${userdPeerId} Details:`, serializedUserDetails);
        res.json(serializedUserDetails);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});


// Function to get all contracts
app.get('/get-all-contracts', async (req, res) => {
    try {
        const allContracts = await freeTrialContract.getAllContracts();
        // Convert BigInt values to strings for debugging
        const serializedAllContracts = allContracts.map(contract => {
            const serializedContract = { ...contract };
            try {
                serializedContract.freeTrialDays = contract.freeTrialDays.toString();
                serializedContract.storageSizeAllowed = contract.storageSizeAllowed.toString();
                serializedContract.timeStamp = contract.timeStamp.toString();
                serializedContract.userNo = contract.userNo.toString();
            } catch (error) {
                console.error('Error while serializing contract:', error);
            }
            return serializedContract;
        });

        // Send the response
        res.json(serializedAllContracts);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

// Function to get user details by Peer ID
app.get('/get-user-details-by-peer-id/:userdPeerId', async (req, res) => {
    const { userdPeerId } = req.params;
    console.log(req.params)
    try {
        const userDetails = await freeTrialContract.getUserContractDetailsByPeerId(userdPeerId);

        const serializedUserDetails = {
            userName: userDetails[0],
            userBio: userDetails[1],
            userdPeerId: userDetails[2],
            freeTrialDays: userDetails[3].toString(),
            storageSizeAllowed: userDetails[4].toString(),
            timeStamp: userDetails[5].toString(),
            accountState: userDetails[6],
            userWalletAddrs: userDetails[7],
            freeFidereClaim: userDetails[8],
            userNo: userDetails[9].toString(),
        };

        console.log(`User details by Peer ID (${userdPeerId}):`, serializedUserDetails);
        res.json(serializedUserDetails);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

// Function to fetch token balance for a user using peer ID
app.get('/fetch-token-balance/:userdPeerId', async (req, res) => {
    const { userdPeerId } = req.params;
    console.log(req.params)
    try {
        // Fetch user details from the smart contract using peer ID
        const userDetails = await freeTrialContract.getUserContractDetailsByPeerId(userdPeerId);

        // Extract user's wallet address from the fetched user details
        const userWalletAddress = userDetails[7];

        // Fetch token balance using the user's wallet address
        const tokenBalance = await fetchTokenBalance(userWalletAddress);

        res.json({ tokenBalance });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

// Function to fetch token balance using ethers.js
async function fetchTokenBalance(walletAddress) {
    // Connect to the token contract using ethers
    const tokenContract = new hre.ethers.Contract("0x6e6B2a630Fd98E4C674f32206eaF164a1Ec9a93D", Fidere_ContractAbi, userWallet);
    
    // Fetch token balance
    const tokenBalance = await tokenContract.balanceOf(walletAddress);
    
    // Convert token balance to human-readable format (wei to ether)
    return hre.ethers.formatUnits(tokenBalance, 18);
}


// Route to transfer tokens to a user using Peer ID
app.post('/transfer-tokens/:userdPeerId/:amount', async (req, res) => {
    const { userdPeerId, amount } = req.params;
    console.log(req.params)
    try {
        console.log(`Token tranfer called, Sending tokes to:${userdPeerId}, tokens:${amount}`)
        // Fetch user details from the smart contract using peer ID
        const userDetails = await freeTrialContract.getUserContractDetailsByPeerId(userdPeerId);

        // Extract user's wallet address from the fetched user details
        const userWalletAddress = userDetails[7];

        // Connect to the Fidere token contract using ethers
        const tokenContract = new hre.ethers.Contract(FidereContractID, Fidere_ContractAbi, userWallet);

        // Increase the gas price here (example: 100 Gwei)
        const increasedGasPrice = hre.ethers.parseUnits('100', 'gwei');

        // Convert the amount to Wei
        const amountWei = hre.ethers.parseEther(amount);

        // Perform token transfer
        const transferTx = await tokenContract.transfer(userWalletAddress, amountWei, { gasPrice: increasedGasPrice });

        // Wait for the transfer transaction to be mined
        await transferTx.wait();

        console.log(transferTx)

        console.log(`Transferred ${amount} tokens to user with Peer ID ${userdPeerId}`);
        res.send(`Transferred ${amount} tokens to user with Peer ID ${userdPeerId}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

// Route to fetch transaction details by transaction hash
app.get('/fetch-transaction-details/:transactionHash', async (req, res) => {
    const { transactionHash } = req.params;
    console.log(req.params)
    try {
        const transactionDetails = await fetchTransactionDetails(transactionHash);
        res.json({ transactionDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

// Function to fetch transaction details using the transaction hash
async function fetchTransactionDetails(transactionHash) {
    try {
        const transaction = await alchemy.getTransaction(transactionHash);
        return transaction;
    } catch (error) {
        throw error;
    }
}



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
