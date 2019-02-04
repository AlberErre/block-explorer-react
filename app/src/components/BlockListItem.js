import React, { Component } from "react";
import "./BlockListItem.css";

class BlockListItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log(this.props.block);
    
    return (
      <div className="BlockListItem">
        <div>
          {this.props.block.blockSize}
        </div>
      </div>
    );
  }
}

export default BlockListItem;