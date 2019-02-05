import React, { Component } from "react";
import { Table, TableHeader, TableRow, TableCell, Text, Badge, DropDown, Button, IconShare } from '@aragon/ui';
import TransactionInfo from "./TransactionInfo";
import "./BlockListItem.css";

class BlockListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
      onlyPaidTransactions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateTransactionInfo = this.updateTransactionInfo.bind(this);
  }

  handleChange(index) {

    this.setState({ 
      activeItem: index 
    }, () => this.updateTransactionInfo(this.state.onlyPaidTransactions[this.state.activeItem]));
  };

  updateTransactionInfo = async (transactionObject) => {
  
    this.setState({
        transactioninfo: transactionObject
    });
  };

  returnTransactionInfoFromEthereum = async (transactionHash) => {
    
    return await this.props.web3.eth.getTransaction(transactionHash);
  };

  componentDidMount = async () => {

    //show only paid transactions
    Promise.all(

      this.props.block.blockTransactions.map( transactionHash => {

        return this.returnTransactionInfoFromEthereum(transactionHash);
      })
    
    ).then( transactionData => {

      const onlyPaidTransactions = transactionData.filter( transaction => transaction.value > 0 );

      console.log(onlyPaidTransactions);

      if (onlyPaidTransactions.length > 0) {

        this.setState({
          onlyPaidTransactions: onlyPaidTransactions
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
          onlyPaidTransactions: noPaidTransactionsObject
        }, () => this.updateTransactionInfo(noPaidTransactionsObject[0]));

      }

    });
  }

  render() {
    
    return (
      <div className="BlockListItem">
        <Table
          header={
            <TableRow>
              <TableHeader title={ `Block Number ${this.props.block.number}`} />
            </TableRow>
          }
        >
          <TableRow>

            <TableCell>
            <div className="tableCellContent">
              <Button.Anchor mode="outline" wide href="https://aragon.one/" target="_blank">
                <div className="etherscanButton">
                  <span>
                    <IconShare />
                  </span>
                  <Text size="normal">see</Text>
                  <Text size="normal" style={{marginBottom: "5px"}}>transaction</Text>
                  <Text size="xsmall">(etherscan.io)</Text>
                </div>
              </Button.Anchor>
            </div>



            <div className="tableCellContent">
              <span>
              Block transactions
              </span>
              <DropDown
                items={this.state.onlyPaidTransactions.map(transaction => transaction.hash)}
                active={this.state.activeItem}
                onChange={this.handleChange}
              />
              <div>
                <TransactionInfo
                  transactionObjectSelected={this.state.onlyPaidTransactions[this.state.activeItem]}
                  web3={this.props.web3}
                  transactioninfo={this.state.transactioninfo}
                  badgeStyles={this.state.badgeStyles}
                />
              </div>
            </div>
            </TableCell>

          </TableRow>
        </Table>

      </div>
    );
  }
}

export default BlockListItem;