import React, { Component } from "react";
import { Table, TableHeader, TableRow, TableCell, 
         Text, DropDown, Button, IconShare } from '@aragon/ui';
import TransactionInfo from "./TransactionInfo";
import { BarLoader } from 'react-spinners';
import "./BlockListItem.css";

class BlockListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      spinnerIsActive: true,
      activeItem: 0,
      transactioninfo: {
        value: 0,
        from: "0x",
        to: "0x"
      },
      badgeStyles: {
        greyBackground: "#dceaef",
        greyTextColor: "#6d8088",
        greenBackground: "#21d48f",
        greenTextColor: "white",
        blueEagleBackground: "#00cbe6",
      },
      onlyPaidTransactions: [],
      etherscanUrl: "https://etherscan.io/tx/",
      transactionHashEtherscan: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateTransactionInfo = this.updateTransactionInfo.bind(this);
  }

  handleChange(index) {
    let {onlyPaidTransactions, activeItem} = this.state; 

    this.setState({ 
      activeItem: index 
    }, () => this.updateTransactionInfo(onlyPaidTransactions[activeItem]));
  };

  updateTransactionInfo = async (transactionObject) => {
    this.setEtherscanTransactionHash(transactionObject.hash);
  
    this.setState({
        transactioninfo: transactionObject
    });
  };

  returnTransactionInfoFromEthereum = async (transactionHash) => {

    return await this.props.web3.eth.getTransaction(transactionHash);
  };

  setEtherscanTransactionHash(transactionHash) {

    this.setState({
      transactionHashEtherscan: transactionHash
    });
  }

  componentDidMount = async () => {

    //show only paid transactions
    Promise.all(

      this.props.block.blockTransactions.map( transactionHash => {
        return this.returnTransactionInfoFromEthereum(transactionHash);
      })
    
    ).then( transactionData => {
      const onlyPaidTransactions = transactionData.filter( transaction => transaction.value > 0 );

      if (onlyPaidTransactions.length > 0) {
        this.setState({
          onlyPaidTransactions: onlyPaidTransactions,
          spinnerIsActive: false
        }, () => this.updateTransactionInfo(this.state.onlyPaidTransactions[0]));

      } else {
        let noPaidTransactionsObject = [{
          gasPrice: 0,
          hash: "No paid transactions has been sent on this block",
          from: "do not apply",
          to: "do not apply",
          value: 0
        }];

        this.setState({
          onlyPaidTransactions: noPaidTransactionsObject,
          spinnerIsActive: false
        }, () => this.updateTransactionInfo(noPaidTransactionsObject[0]));
      }

    });
  }

  render() {
    const { web3, block } = this.props;
    const { spinnerIsActive, onlyPaidTransactions, activeItem,
            transactioninfo, badgeStyles, etherscanUrl, transactionHashEtherscan } = this.state;

    return (
      <div className="BlockListItem">

        <Table className="tableContainer"
          header={
            <TableRow>
              <TableHeader title={ `Block Number ${block.number}`} />
            </TableRow>
          }>
          <TableRow>

            <TableCell>
              {
                spinnerIsActive &&
                <span>
                  Loading block data...
                  <div style={{marginTop: "10px"}}>
                    <BarLoader color={'#00F0E0'} />
                  </div>
                </span>
              }

              {
                !spinnerIsActive && 
                <div className="OuterTableCellContent">

                  <div className="tableCellContent">
                    <span style={{marginBottom: "5px"}}>
                    Block transactions
                    </span>
                    <DropDown
                      items={onlyPaidTransactions.map(transaction => transaction.hash)}
                      active={activeItem}
                      onChange={this.handleChange}
                    />
                    <div>
                      <TransactionInfo
                        transactionObjectSelected={onlyPaidTransactions[activeItem]}
                        web3={web3}
                        transactioninfo={transactioninfo}
                        badgeStyles={badgeStyles}
                      />
                    </div>
                  </div>

                  <div className="etherscanButton">
                    <Button.Anchor 
                      mode="outline" wide target="_blank"
                      href={etherscanUrl + transactionHashEtherscan}>
                      <div className="etherscanButton">
                        <span>
                          <IconShare />
                        </span>
                        <div className="etherscanButton hideOnMobile">
                          <Text size="normal">see</Text>
                          <Text size="normal" style={{marginBottom: "5px"}}>transaction</Text>
                          <Text size="xsmall">(etherscan.io)</Text>
                        </div>
                      </div>
                    </Button.Anchor>
                  </div>

                </div>
              }
            </TableCell>

          </TableRow>
        </Table>

      </div>
    );
  }
}

export default BlockListItem;