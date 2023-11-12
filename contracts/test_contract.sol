// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract AstralNet_FreeTrial {

    // Contract owner's address
    address public owner;

    // Counter for tracking the number of users
    uint public UserNum = 0;

    // Constructor initializes the contract owner
    constructor() {
        owner = 0x43eDA7715b3bC880F886F335b016a33771CA5d01; // Set the initial contract owner
    }

    // Modifier to restrict functions to only the current owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    // Structure to store user contract details
    struct astralNet_access_contract {
        string userName;        // New: User's name
        string userBio;         // New: User's bio
        string userdPeerId;
        uint freeTrialDays;
        uint storageSizeAllowed;
        uint timeStamp;
        bool accountState;
        address userWalletAddrs;
        bool freeFidereClaim;
        uint userNo;
    }


    // Mapping to store user contract details by user number
    mapping(uint => astralNet_access_contract) public AstralNet_Contract_Info;

    // Mapping to associate user's Peer ID with their user number
    mapping(string => uint) private PeerIdToUserNo;

    // Function to change the contract owner
    function changeOwner(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "Invalid new owner address");
        owner = _newOwner;
    }

    // Function to add a new user contract
    function NewAstralNetContract(
        string memory _userName,
        string memory _userBio,
        string memory _userdPeerId,
        uint _freeTrialDays,
        uint _storageSizeAllowed,
        bool _accountState,
        address _userWalletAddrs,
        bool _freeFidereClaim
    ) public onlyOwner() {
        UserNum++;
        AstralNet_Contract_Info[UserNum] = astralNet_access_contract(
            _userName,
            _userBio,
            _userdPeerId,
            _freeTrialDays,
            _storageSizeAllowed,
            block.timestamp,
            _accountState,
            _userWalletAddrs,
            _freeFidereClaim,
            UserNum
        );
        PeerIdToUserNo[_userdPeerId] = UserNum;

        // Log user contract details
        console.log("New AstralNet user contract added");
        console.log("User Name:", AstralNet_Contract_Info[UserNum].userName);
        console.log("User Bio:", AstralNet_Contract_Info[UserNum].userBio);
        console.log("User PeerID:", AstralNet_Contract_Info[UserNum].userdPeerId);
        console.log("Free trial days:", AstralNet_Contract_Info[UserNum].freeTrialDays);
        console.log("Storage allowed:", AstralNet_Contract_Info[UserNum].storageSizeAllowed);
        console.log("Time stamp:", AstralNet_Contract_Info[UserNum].timeStamp);
        console.log("Account state:", AstralNet_Contract_Info[UserNum].accountState);
        console.log("User wallet:", AstralNet_Contract_Info[UserNum].userWalletAddrs);
        console.log("Free Fidere Claim:", AstralNet_Contract_Info[UserNum].freeFidereClaim);
        console.log("User No:", AstralNet_Contract_Info[UserNum].userNo);
    }

    // Function to update user's wallet address using Peer ID
    function updateUserWalletAddressByPeerId(string memory _userdPeerId, address _newWalletAddress) public onlyOwner() {
        uint userNo = PeerIdToUserNo[_userdPeerId];
        require(userNo > 0, "Peer ID not found");
        AstralNet_Contract_Info[userNo].userWalletAddrs = _newWalletAddress;
    }

    // Function to update user's Free Fidere Claim status using Peer ID
    function updateFreeFidereClaimByPeerId(string memory _userdPeerId, bool _newFreeFidereClaim) public onlyOwner() {
        uint userNo = PeerIdToUserNo[_userdPeerId];
        require(userNo > 0, "Peer ID not found");
        AstralNet_Contract_Info[userNo].freeFidereClaim = _newFreeFidereClaim;
    }

    // Function to update user's storage size allowed using Peer ID
    function updateStorageSizeAllowedByPeerId(string memory _userdPeerId, uint _newStorageSizeAllowed) public onlyOwner() {
        uint userNo = PeerIdToUserNo[_userdPeerId];
        require(userNo > 0, "Peer ID not found");
        AstralNet_Contract_Info[userNo].storageSizeAllowed = _newStorageSizeAllowed;
    }

    // Function to update user's account state using Peer ID
    function updateAccountStateByPeerId(string memory _userdPeerId, bool _newAccountState) public onlyOwner() {
        uint userNo = PeerIdToUserNo[_userdPeerId];
        require(userNo > 0, "Peer ID not found");
        AstralNet_Contract_Info[userNo].accountState = _newAccountState;
    }

    // Function to update user's name using Peer ID
    function updateUserNameByPeerId(string memory _userdPeerId, string memory _newUserName) public onlyOwner() {
        uint userNo = PeerIdToUserNo[_userdPeerId];
        require(userNo > 0, "Peer ID not found");
        AstralNet_Contract_Info[userNo].userName = _newUserName;
    }

    // Function to update user's bio using Peer ID
    function updateUserBioByPeerId(string memory _userdPeerId, string memory _newUserBio) public onlyOwner() {
        uint userNo = PeerIdToUserNo[_userdPeerId];
        require(userNo > 0, "Peer ID not found");
        AstralNet_Contract_Info[userNo].userBio = _newUserBio;
    }


    // Function to get user contract details by user number
    function getUserContractDetails(uint _userNo) public view onlyOwner() returns (string memory, string memory, string memory, uint, uint, uint, bool, address, bool, uint) {
        require(_userNo > 0 && _userNo <= UserNum, "Invalid user number");
        astralNet_access_contract memory userContract = AstralNet_Contract_Info[_userNo];
        return (
            userContract.userName,
            userContract.userBio,
            userContract.userdPeerId,
            userContract.freeTrialDays,
            userContract.storageSizeAllowed,
            userContract.timeStamp,
            userContract.accountState,
            userContract.userWalletAddrs,
            userContract.freeFidereClaim,
            userContract.userNo
        );
    }

    // Function to get all user contracts
    function getAllContracts() public view onlyOwner() returns (astralNet_access_contract[] memory) {
        astralNet_access_contract[] memory allContracts = new astralNet_access_contract[](UserNum);

        for (uint i = 1; i <= UserNum; i++) {
            allContracts[i - 1] = AstralNet_Contract_Info[i];
        }

        return allContracts;
    }

    // Function to get user contract details by Peer ID
    function getUserContractDetailsByPeerId(string memory _userdPeerId) public view returns (string memory, string memory, string memory, uint, uint, uint, bool, address, bool, uint) {
        uint userNo = PeerIdToUserNo[_userdPeerId];
        require(userNo > 0, "Peer ID not found");
        return getUserContractDetails(userNo);
    }
}
