require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    mumbai: {
      url: `https://endpoints.omniatech.io/v1/matic/mumbai/public`,
      accounts: [process.env.pkey],
    },
  },
};
// etherscan: {
//   // Your API key for Etherscan - rinkeby
//   // Obtain one at https://etherscan.io/
//   apiKey: "HBMB8ER9AI26GMHR2IAGYK6KS3AX3FA6J1"
// },
// // etherscan: {
// //   // Your API key for Etherscan - matic
// //   // Obtain one at https://etherscan.io/
// //   apiKey: process.env.ETHERSCAN_API,
// //   // apiKey: process.env.ETHERSCAN_API,
// //   // apiKey: {
// //   //   polygonMumbai: "G23YP8VZFF95Y5S7VZJRP653YPXQE2GGVM",
// //   // },
// // },
// };