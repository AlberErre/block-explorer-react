import React, { Component } from "react";
import { AragonApp, Text } from '@aragon/ui';
import { BarLoader } from 'react-spinners';
import getWeb3 from "./utils/getWeb3";
import MainInfo from "./components/MainInfo";
import BlockList from "./components/BlockList";

import "./App.css";

class App extends Component {

  constructor() {
    super();

    this.state = {
      web3: null,
      accounts: null,
      networkId: null,
      lastBlockNumber: null,
      lastBlockHash: null,
      lastBlockSize: null, 
      gasUsedOnBlock: null,
      lastBlockTime: null,
      lastBlockTransactions: null,
      difficulty: null,
      lastTenBlocks: [],
      loadingSpinner: true,
    };
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      await this.setState({
        web3: web3,
        accounts: accounts,
        networkId: networkId
      }, this.getLastBlockInfo);

      setInterval(this.getLastBlockInfo, 10000);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getLastBlockInfo = async () => {
    
    const { web3 } = this.state;

    let lastBlockNumber = await web3.eth.getBlockNumber();
    let lastBlock = await web3.eth.getBlock(lastBlockNumber);
    let lastBlockHash = lastBlock.hash;
    let lastBlockSize = lastBlock.size;
    let gasUsedOnBlock = lastBlock.gasUsed;
    let lastBlockTime = lastBlock.timestamp;
    let lastBlockTransactions = lastBlock.transactions;
    let difficulty = lastBlock.difficulty;

    this.createLastTenBlocks(lastBlockNumber, web3);

    this.setState({
      lastBlockNumber: lastBlockNumber,
      lastBlockHash: lastBlockHash,
      lastBlockSize: lastBlockSize, 
      gasUsedOnBlock: gasUsedOnBlock,
      lastBlockTime: lastBlockTime,
      lastBlockTransactions: lastBlockTransactions,
      difficulty: difficulty,
    });
  };

  createLastTenBlocks = async (blockNumber, _web3)  => {
    let blocksArray = [1,2,3,4,5,6,7,8,9,10];

    Promise.all(
      
      blocksArray.map( async (e, i) => {
      
        let block = await _web3.eth.getBlock(blockNumber - i);
  
        return {
          number: blockNumber - i,
          blockHash: block.hash,
          blockSize: block.size,
          gasUsedOnBlock: block.gasUsed,
          blockTime: block.timestamp,
          blockTransactions: block.transactions,
          blockDifficulty: block.difficulty,
        };
      })

    ).then( result => {
      this.setState({
        lastTenBlocks: result,
        loadingSpinner: false
      });
    });
  };

  render() {

    const { loadingSpinner, networkId, lastBlockNumber, lastBlockHash, lastBlockSize,
            gasUsedOnBlock, lastBlockTime, lastBlockTransactions, difficulty, 
            lastTenBlocks, web3} = this.state;

    return (
      <AragonApp publicUrl="/aragon-ui-assets/">
        
        {
          loadingSpinner &&
          <div className="spinnerContainer">
            Loading...
            <div style={{marginTop: "10px"}}>
              <BarLoader color={'#00F0E0'} />
            </div>
          </div>
        }
        
        {
          !loadingSpinner &&

          <div className="App">

            <Text size="xxlarge" style={{margin: "20px"}}>
              <i className="fab fa-ethereum"></i> Ethereum Block Explorer
            </Text>

            <div className="aragonCard Header">
              <MainInfo
                networkId={networkId}
                lastBlockNumber={lastBlockNumber}
                lastBlockHash={lastBlockHash}
                lastBlockSize={lastBlockSize}
                gasUsedOnBlock={gasUsedOnBlock}
                lastBlockTime={lastBlockTime}
                lastBlockTransactions={lastBlockTransactions}
                difficulty={difficulty}
              />
            </div>

            <Text size="xsmall" style={{width: "75vw", marginBottom: "30px", textAlign: "center"}}>
              Here you can see the last ten blocks on Ethereum and all its transactions within each block. Transactions without ether movement will not be displayed.
            </Text>

            <BlockList
              lastTenBlocks={lastTenBlocks}
              web3={web3}
            />

            <Text size="xsmall" style={{marginBottom: "50px"}}>
              Made with ♡ by <a href="https://albererre.com/" target="_blank">Alber Erre</a>
            </Text>

          </div>
        }

      </AragonApp>
    );
  }
}

export default App;
