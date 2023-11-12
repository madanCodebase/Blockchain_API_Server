import fetch from 'node-fetch';

// Local server URL
const serverUrl = 'http://localhost:3000';

// Example data for creating a new contract
const newContractData = {
  userName: 'Not Provided',        
  userBio: 'Not Provided',
  userdPeerId: 'QmU2v88tGcEZDik2bhHdU2SHbkZ7u2APmcNXwanZi5iTW5',
  freeTrialDays: 90,
  storageSizeAllowed: 20480,
  accountState: true,
  userWalletAddrs: '0x657F262C9C8d76959a76F5693CdA4548bff5e413',
  freeFidereClaim: false
};

// Function to create a new contract
async function createNewContract() {
  try {
    const response = await fetch(`${serverUrl}/new-contract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newContractData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('New contract created:', result);
    } else {
      console.error('Error creating new contract:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating new contract:', error.message);
  }
}

// Function to update user name
async function updateUserName(userPeerID, newUserName) {
  try {
    const response = await fetch(`${serverUrl}/update-user-name/${userPeerID}/${newUserName}`, {
      method: 'POST'
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result);
    } else {
      console.error('Error updating user name:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating user name:', error.message);
  }
}

// Function to update user bio
async function updateUserBio(userPeerID, newUserBio) {
  try {
    const response = await fetch(`${serverUrl}/update-user-bio/${userPeerID}/${newUserBio}`, {
      method: 'POST'
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result);
    } else {
      console.error('Error updating user bio:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating user bio:', error.message);
  }
}


// Function to update user wallet address
async function updateUserWalletAddress(userPeerID, newWalletAddress) {
  try {
    const response = await fetch(`${serverUrl}/update-user-wallet/${userPeerID}/${newWalletAddress}`, {
      method: 'POST'
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result);
    } else {
      console.error('Error updating user wallet address:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating user wallet address:', error.message);
  }
}

// Function to update user's freeFidere claim
async function updateFreeFidereClaim(userPeerID, newFreeFidereClaim) {
  try {
    const response = await fetch(`${serverUrl}/update-fidere-claim/${userPeerID}/${newFreeFidereClaim}`, {
      method: 'POST'
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result);
    } else {
      console.error('Error updating freeFidere claim:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating freeFidere claim:', error.message);
  }
}

// Function to update storage size allowed
async function updateStorageSizeAllowed(userPeerID, newStorageSizeAllowed) {
  try {
    const response = await fetch(`${serverUrl}/update-storage-size/${userPeerID}/${newStorageSizeAllowed}`, {
      method: 'POST'
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result);
    } else {
      console.error('Error updating storage size allowed:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating storage size allowed:', error.message);
  }
}

// Function to update account state
async function updateAccountState(userPeerID, newAccountState) {
  try {
    const response = await fetch(`${serverUrl}/update-account-state/${userPeerID}/${newAccountState}`, {
      method: 'POST'
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result);
    } else {
      console.error('Error updating account state:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating account state:', error.message);
  }
}

// Function to get user details
async function getUserDetails(userPeerID) {
  try {
    const response = await fetch(`${serverUrl}/get-user-details/${userPeerID}`);

    if (response.ok) {
      const userDetails = await response.json();
      console.log('User details:', userDetails);
    } else {
      console.error('Error getting user details:', response.statusText);
    }
  } catch (error) {
    console.error('Error getting user details:', error.message);
  }
}

// Function to get all contracts
async function getAllContracts() {
  try {
    const response = await fetch(`${serverUrl}/get-all-contracts`);

    if (response.ok) {
      const contracts = await response.json();
      console.log('All contracts:', contracts);
    } else {
      console.error('Error getting all contracts:', response.statusText);
    }
  } catch (error) {
    console.error('Error getting all contracts:', error.message);
  }
}

// Function to get user details by Peer ID
async function getUserDetailsByPeerId(userdPeerId) {
  try {
    const response = await fetch(`${serverUrl}/get-user-details-by-peer-id/${userdPeerId}`);

    if (response.ok) {
      const userDetails = await response.json();
      console.log('User details by Peer ID:', userDetails);
    } else {
      console.error('Error getting user details by Peer ID:', response.statusText);
    }
  } catch (error) {
    console.error('Error getting user details by Peer ID:', error.message);
  }
}

// Function to fetch token balance for a user using their peer ID
async function getTokenBalance(userdPeerId) {
  try {
    const response = await fetch(`${serverUrl}/fetch-token-balance/${userdPeerId}`);

    if (response.ok) {
      const balance = await response.json();
      console.log('Token balance:', balance);
    } else {
      console.error('Error fetching token balance:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching token balance:', error.message);
  }
}

// Function to transfer tokens to a user using their peer ID
async function transferTokens(userdPeerId, amount) {
  try {
    const response = await fetch(`${serverUrl}/transfer-tokens/${userdPeerId}/${amount}`, {
      method: 'POST',
    });

    if (response.ok) {
      const result = await response.text();
      console.log('Token transfer result:', result);
    } else {
      console.error('Error transferring tokens:', response.statusText);
    }
  } catch (error) {
    console.error('Error transferring tokens:', error.message);
  }
}

// Function to get transaction details using transaction hash
async function getTransactionDetails(transactionHash) {
  try {
      const response = await fetch(`${serverUrl}/fetch-transaction-details/${transactionHash}`);
      if (response.ok) {
          const data = await response.json();
          return data.transactionDetails;
          
      } else {
          throw new Error('Error fetching transaction details');
      }
  } catch (error) {
      throw error;
  }
}


// Call the functions to interact with the APIs
//createNewContract();
//updateUserWalletAddress(1, '0xNewWalletAddress');
 updateFreeFidereClaim('QmanZPxMcmHxVJ2CUAJdkkcb7aBHz97SSwEpZsL7Ttr6js', false);
//updateStorageSizeAllowed(1, 4048);
//updateAccountState(8, true);
//getUserDetails(4);
//getAllContracts();
//getUserDetailsByPeerId('QmaJLJvpVACB3Tt91NdCrzkcDp8DpsHNCbzq6BDhkUiWHD');
getTokenBalance('QmanZPxMcmHxVJ2CUAJdkkcb7aBHz97SSwEpZsL7Ttr6js');

//updateUserName('QmaJLJvpVACB3Tt91NdCrzkcDp8DpsHNCbzq6BDhkUiWHD', 'Madan');

//transferTokens('QmaJLJvpVACB3Tt91NdCrzkcDp8DpsHNCbzq6BDhkUiWHD', 10)

// Example usage of the getTransactionDetails function
/*const transactionHash = '0xaa82e7892983aea798ddd0dd10370402bc6c98c8d41132c177b4087e217aaff1'; // Replace with your actual transaction hash
(async () => {
    try {
        const transactionDetails = await getTransactionDetails(transactionHash);
        console.log('Transaction Details:', transactionDetails);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();*/