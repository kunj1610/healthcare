// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contract to manage laboratory registration and details
contract LabRegistry {
    // Structure to store laboratory information
    struct Lab {
        string fullName;      // Full name of the laboratory
        string association;   // Associated organization/institution
        string medicalID;     // Medical license/registration ID
        string department;    // Department the lab belongs to
        string email;         // Contact email address
        bool isRegistered;    // Registration status
    }

    // Address of the admin who can register labs
    address public admin;
    // Mapping to store lab details against their hashed email
    mapping(bytes32 => Lab) public labs; // Using hashed email as the key

    // Event emitted when a new lab is registered
    event LabRegistered(
        string email,         // Email of the registered lab
        string fullName,      // Name of the registered lab
        string association,   // Association of the registered lab
        string medicalID,     // Medical ID of the registered lab
        string department     // Department of the registered lab
    );

    // Modifier to restrict access to admin only
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Constructor sets deployer as admin
    constructor() {
        admin = msg.sender;
    }

    // Function to register a new laboratory
    function registerLab(
        string memory _email,         // Email address of the lab
        string memory _fullName,      // Full name of the lab
        string memory _association,   // Associated organization
        string memory _medicalID,     // Medical license number
        string memory _department     // Department name
    ) public onlyAdmin {
        bytes32 emailHash = keccak256(abi.encodePacked(_email)); // Hashing email as key
        require(!labs[emailHash].isRegistered, "Lab already registered");

        // Create new lab record
        labs[emailHash] = Lab(
            _fullName,
            _association,
            _medicalID,
            _department,
            _email,
            true
        );

        // Emit event for lab registration
        emit LabRegistered(_email, _fullName, _association, _medicalID, _department);
    }

    // Function to retrieve laboratory details using email
    function getLabDetails(string memory _email) 
        public 
        view 
        returns (
            string memory fullName,    // Full name of the lab
            string memory association, // Associated organization
            string memory medicalID,   // Medical license number
            string memory department,  // Department name
            string memory email,       // Email address
            bool isRegistered         // Registration status
        ) 
    {
        bytes32 emailHash = keccak256(abi.encodePacked(_email)); 
        require(labs[emailHash].isRegistered, "Lab not registered");

        // Get lab details from mapping
        Lab memory lab = labs[emailHash];
        // Return all lab details
        return (
            lab.fullName,
            lab.association,
            lab.medicalID,
            lab.department,
            lab.email,
            lab.isRegistered
        );
    }
}