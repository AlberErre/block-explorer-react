import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";

class App extends Component {

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      await this.setState({
        web3: web3,
        accounts: accounts,
        networkId: networkId
      });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

        <div className="Header">
          <h1>Good to Go!</h1>
          <p>Here is the last block info:</p>
        </div>

      </div>
    );
  }
}

export default App;
