// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LabRegistry {
    struct Lab {
        string fullName;
        string association;
        string medicalID;
        string department;
        string email;
        bool isRegistered;
    }

    address public admin;
    mapping(bytes32 => Lab) public labs; // Using hashed email as the key

    event LabRegistered(
        string email, 
        string fullName, 
        string association, 
        string medicalID, 
        string department
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerLab(
        string memory _email,
        string memory _fullName,
        string memory _association,
        string memory _medicalID,
        string memory _department
    ) public onlyAdmin {
        bytes32 emailHash = keccak256(abi.encodePacked(_email)); // Hashing email as key
        require(!labs[emailHash].isRegistered, "Lab already registered");

        labs[emailHash] = Lab(
            _fullName,
            _association,
            _medicalID,
            _department,
            _email,
            true
        );

        emit LabRegistered(_email, _fullName, _association, _medicalID, _department);
    }

    function getLabDetails(string memory _email) 
        public 
        view 
        returns (
            string memory fullName, 
            string memory association, 
            string memory medicalID, 
            string memory department, 
            string memory email, 
            bool isRegistered
        ) 
    {
        bytes32 emailHash = keccak256(abi.encodePacked(_email)); 
        require(labs[emailHash].isRegistered, "Lab not registered");

        Lab memory lab = labs[emailHash];
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
