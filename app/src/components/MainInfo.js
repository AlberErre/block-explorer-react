import React, { Component } from "react";
import "./MainInfo.css";

class MainInfo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>networkId: {this.props.networkId}</div>
        <div>lastBlockNumber: {this.props.lastBlockNumber}</div>
        <div>lastBlockHash: {this.props.lastBlockHash}</div>
        <div>lastBlockSize: {this.props.lastBlockSize}</div>
        <div>gasUsedOnBlock: {this.props.gasUsedOnBlock}</div>
        <div>lastBlockTime: {this.props.lastBlockTime}</div>
        <div>lastBlockTransactions: {this.props.lastBlockTransactions}</div>
        <div>difficulty: {this.props.difficulty}</div>
      </div>
    );
  }
}

export default MainInfo;