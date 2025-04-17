
# Decentralized Healthcare Application

## Overview

This project is a decentralized healthcare platform that leverages blockchain technology to securely manage patient data and healthcare transactions. It integrates smart contracts with a user-friendly frontend to ensure transparency, security, and efficiency in healthcare services.

<!-- ![Temp text](./src/assets/images/10.svg) -->

## Features

- **Smart Contracts**: Implemented using Solidity to handle healthcare records and transactions.
- **Frontend**: Built with React.js to provide an interactive user interface.
- **Blockchain Integration**: Utilizes Ethereum blockchain for decentralized data management.
- **Truffle Suite**: Employed for smart contract development, testing, and deployment.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Truffle Suite installed globally
- Ganache CLI or GUI for local blockchain simulation

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kunj1610/healthcare.git
   cd healthcare
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile smart contracts:
   ```bash
   truffle compile
   ```

4. Migrate contracts to the blockchain:
   ```bash
   truffle migrate
   ```

5. Run the development server:
   ```bash
   npm start
   ```

## Project Structure

- `contracts/`: Contains Solidity smart contracts.
- `migrations/`: Deployment scripts for smart contracts.
- `src/`: React.js frontend source code.
- `test/`: Test scripts for smart contracts.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.
