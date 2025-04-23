// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contract to manage doctor registration and details
contract DoctorRegistry {
    // Structure to store doctor information
    struct Doctor {
        string fullName;      // Full name of the doctor
        string hospital;      // Hospital where doctor works
        string addressDetails; // Address details of the doctor
        string position;      // Position/role of the doctor
        string department;    // Department the doctor belongs to
        string medicalID;     // Medical license/ID number
        string email;         // Contact email
        bool isRegistered;    // Registration status
    }

    // Address of the admin who can register doctors
    address public admin;
    // Mapping to store doctor details against their Ethereum address
    mapping(address => Doctor) public doctors;
    // Event emitted when a new doctor is registered
    event DoctorRegistered(address indexed doctorAddress, string fullName, string hospital);

    // Modifier to restrict access to admin only
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Constructor sets deployer as admin
    constructor() {
        admin = msg.sender;
    }

    // Function to register a new doctor
    function registerDoctor(
        address _doctorAddress,
        string memory _fullName,
        string memory _hospital,
        string memory _addressDetails,
        string memory _position,
        string memory _department,
        string memory _medicalID,
        string memory _email
    ) public onlyAdmin {
        // Check if doctor is not already registered
        require(!doctors[_doctorAddress].isRegistered, "Doctor already registered");
        
        // Create new doctor record
        doctors[_doctorAddress] = Doctor(
            _fullName,
            _hospital,
            _addressDetails,
            _position,
            _department,
            _medicalID,
            _email,
            true
        );
        
        // Emit event for doctor registration
        emit DoctorRegistered(_doctorAddress, _fullName, _hospital);
    }

    // Function to retrieve doctor details
    function getDoctorDetails(address _doctorAddress) public view returns (
        string memory, string memory, string memory, string memory, string memory, string memory, string memory, bool
    ) {
        // Get doctor details from mapping
        // Get all the details
        Doctor memory doc = doctors[_doctorAddress];
        // Verify doctor exists
        require(doc.isRegistered, "Doctor not registered");
        // Return all doctor details
        return (
            doc.fullName,
            doc.hospital,
            doc.addressDetails,
            doc.position,
            doc.department,
            doc.medicalID,
            doc.email,
            doc.isRegistered
        );
    }
}