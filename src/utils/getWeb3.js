import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      const provider = new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/813f7758462347cbb1d64391851852d1"
      );
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using infura web3 (mainnet).");
      resolve(web3);
    });
  });

export default getWeb3;
