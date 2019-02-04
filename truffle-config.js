require('dotenv').config();

const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.RINKEBY_PRIVATEKEY, "https://rinkeby.infura.io/v3/813f7758462347cbb1d64391851852d1", 0, 1);
      },
      network_id: '4'
    }
  }
};