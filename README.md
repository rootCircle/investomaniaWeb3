# InvestomaniaWeb3

InvestomaniaWeb3 is a decentralized finance (DeFi) application built on the Ethereum blockchain, allowing users to invest in various deals represented as non-fungible tokens (NFTs). This repository serves as the codebase for the project, providing smart contracts, frontend interfaces, and utilities for interacting with the Ethereum network and IPFS (InterPlanetary File System).

## Features

- **Smart Contracts**: Smart contracts written in Solidity facilitate the creation, management, and execution of investment deals represented as NFTs.
- **Frontend Application**: A frontend application built with Next.js provides a user-friendly interface for browsing deals, investing, and managing investments.
- **IPFS Integration**: Integration with IPFS enables decentralized storage and retrieval of files associated with investment deals.

## Project Structure

The project structure is organized as follows:

- **apps/web**: Frontend application directory containing the Next.js application.
- **apps/web3**: Smart contracts and deployment scripts directory.
- **apps/web/utils/blockchainHelper**: Utilities and functions for interacting with the Ethereum network.
- **apps/web3/contracts**: Solidity smart contracts reside here.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/rootCircle/investomania-web3.git
   ```

2. Install dependencies:

   ```bash
   cd investomania-web3
   pnpm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     - `PINNATA_BASE_URL`: Base URL for Pinata API.
     - `PINNATA_JWT_TOKEN`: JWT token for Pinata API authentication.

4. Start the frontend application:

   ```bash
   pnpm run dev
   ```

5. Access the application in your browser at `http://localhost:3000`.

## Usage

The application allows users to:

- Browse available investment deals.
- Invest in deals by minting NFTs.
- Manage investments, including reverting investments and transferring NFTs.
- Approve or reject deals as the system administrator.

## Contributing

Contributions are welcome! If you have ideas for improvements, open an issue or submit a pull request.

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Special thanks to the developers of Hardhat, Next.js, IPFS, and ethers.js for providing the tools and libraries necessary for building blockchain applications.
- Inspiration and guidance from various online tutorials, forums, and documentation resources that helped in understanding and implementing blockchain technology.
- Special thanks to [Divyanshu](https://github.com/15IITian) and [Disha](https://github.com/Dis1309) for helping in my initial journey to the world of Blockchain :-)

---

**Note**: Make sure to set up your environment variables and update the project-specific configurations as needed before running the application.