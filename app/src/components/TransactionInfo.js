import React, { Component } from "react";
import { Table, TableHeader, TableRow, TableCell, Text, Badge, DropDown } from '@aragon/ui';

import "./TransactionInfo.css";

class TransactionInfo extends Component {

  transfromWeiToEther = (amount) => {

    return this.props.web3.utils.fromWei(String(amount), 'ether');
  };

  render() {

    const { badgeStyles, transactioninfo } = this.props;

    return (
        
      <div className="TransactionInfoContainer">

        <div className="transactionInnerContainer mobileEtherValues">
            <div className="tableCellContent">
                <span>
                Ether
                </span>
                <span>
                    <Badge shape="compact"
                    background={badgeStyles.greyBackground} 
                    foreground={badgeStyles.greyTextColor}>
                        <div className="transactionText">
                            {this.transfromWeiToEther(transactioninfo.value)}
                        </div>
                    </Badge>
                </span>
            </div>

            <div className="tableCellContent">
                <span>
                Gas price (Gwei)
                </span>
                <span>
                    <Badge shape="compact"
                    background={badgeStyles.greyBackground} 
                    foreground={badgeStyles.greyTextColor}>
                        <div className="transactionText">
                            {Number(transactioninfo.gasPrice)/1000000000}
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