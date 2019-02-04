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
        }
      };
  }

  render() {

    const transactionHash = this.props.transactionSelected;
    const { badgeStyles } = this.state;
    
    return (
      <div className="TransactionInfoContainer">

        <div className="tableCellContent">
            <span>
            Ether sent
            </span>
            <span>
                <Badge shape="compact"
                background={badgeStyles.greyBackground} 
                foreground={badgeStyles.greyTextColor}>
                    <div className="transactionText">
                    Hey
                    </div>
                </Badge>
            </span>
        </div>

        <div className="tableCellContent">
            <span>
            From
            </span>
            <span>
                <Badge shape="compact"
                background={badgeStyles.greyBackground} 
                foreground={badgeStyles.greyTextColor}>
                    <div className="transactionText">
                    Hey
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
                    Hey
                    </div>
                </Badge>
            </span>
        </div>

      </div>
    );
  }
}

export default TransactionInfo;