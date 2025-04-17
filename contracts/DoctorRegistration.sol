// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DoctorRegistry {
    struct Doctor {
        string fullName;
        string hospital;
        string addressDetails;
        string position;
        string department;
        string medicalID;
        string email;
        bool isRegistered;
    }

    address public admin;
    mapping(address => Doctor) public doctors;
    event DoctorRegistered(address indexed doctorAddress, string fullName, string hospital);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

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
        require(!doctors[_doctorAddress].isRegistered, "Doctor already registered");
        
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
        
        emit DoctorRegistered(_doctorAddress, _fullName, _hospital);
    }

    function getDoctorDetails(address _doctorAddress) public view returns (
        string memory, string memory, string memory, string memory, string memory, string memory, string memory, bool
    ) {
        Doctor memory doc = doctors[_doctorAddress];
        require(doc.isRegistered, "Doctor not registered");
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