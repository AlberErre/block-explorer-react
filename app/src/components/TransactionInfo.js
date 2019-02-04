import React, { Component } from "react";
import { Table, TableHeader, TableRow, TableCell, Text, Badge, DropDown } from '@aragon/ui';

import "./TransactionInfo.css";

class TransactionInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
        badgeStyles: {
          greyBackground: "#dceaef",
          greyTextColor: "#6d8088",
          greenBackground: "#21d48f",
          greenTextColor: "white",
        },
        transactioninfo: {
            value: 0,
            from: "0x",
            to: "0x"
        }
    };
  }

  componentDidMount() {

    this.getTransactionInfoFromEthereum(this.props.transactionSelected);
  }

  getTransactionInfoFromEthereum = async (transactionHash) => {
    
    let transactioninfo = await this.props.web3.eth.getTransaction(transactionHash);

    this.setState({
        transactioninfo: transactioninfo
    });
  };

  render() {

    const { badgeStyles, transactioninfo } = this.state;
    
    return (
        
      <div className="TransactionInfoContainer">

        <div className="transactionInnerContainer">
            <div className="tableCellContent">
                <span>
                Ether (wei)
                </span>
                <span>
                    <Badge shape="compact"
                    background={badgeStyles.greyBackground} 
                    foreground={badgeStyles.greyTextColor}>
                        <div className="transactionText">
                            {transactioninfo.value}
                        </div>
                    </Badge>
                </span>
            </div>

            <div className="tableCellContent">
                <span>
                Gas price
                </span>
                <span>
                    <Badge shape="compact"
                    background={badgeStyles.greyBackground} 
                    foreground={badgeStyles.greyTextColor}>
                        <div className="transactionText">
                            {transactioninfo.gasPrice}
                        </div>
                    </Badge>
                </span>
            </div>
        </div>

        <div className="transactionInnerContainer">
            <div className="tableCellContent">
                <span>
                From
                </span>
                <span>
                    <Badge shape="compact"
                    background={badgeStyles.greyBackground} 
                    foreground={badgeStyles.greyTextColor}>
                        <div className="transactionText">
                            {transactioninfo.from}
                        </div>
                    </Badge>
                </span>
            </div>

            <div className="tableCellContent">
                <span>
                To
                </span>
                <span>
                    <Badge shape="compact"
                    background={badgeStyles.greyBackground} 
                    foreground={badgeStyles.greyTextColor}>
                        <div className="transactionText">
                            {transactioninfo.to}
                        </div>
                    </Badge>
                </span>
            </div>
        </div>

      </div>
    );
  }
}

export default TransactionInfo;