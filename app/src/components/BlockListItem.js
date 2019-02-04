import React, { Component } from "react";
import { Table, TableHeader, TableRow, TableCell, Text, Badge, DropDown } from '@aragon/ui';
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
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.getTransactionInfoFromEthereum = this.getTransactionInfoFromEthereum.bind(this);
  }

  handleChange(index) {

    this.setState({ 
      activeItem: index 
    }, () => this.getTransactionInfoFromEthereum(this.props.block.blockTransactions[this.state.activeItem]));
  };

  getTransactionInfoFromEthereum = async (transactionHash) => {
    
    let transactioninfo = await this.props.web3.eth.getTransaction(transactionHash);

    this.setState({
        transactioninfo: transactioninfo
    });
  };

  render() {

    console.log(this.props.block);
    
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
              <span>
              Block hash
              </span>
              <Badge shape="compact">
                <div className="itemBlockHash">
                  {this.props.block.blockHash}
                </div>
              </Badge>
            </div>
            <div className="tableCellContent">
              <span>
              Block transactions
              </span>
              <DropDown
                items={this.props.block.blockTransactions}
                active={this.state.activeItem}
                onChange={this.handleChange}
              />
              <div>
                <TransactionInfo
                  transactionSelected={this.props.block.blockTransactions[this.state.activeItem]}
                  web3={this.props.web3}
                  transactioninfo={this.state.transactioninfo}
                  getTransactionInfoFromEthereum={this.getTransactionInfoFromEthereum}
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