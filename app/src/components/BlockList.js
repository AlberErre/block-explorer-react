import React, { Component } from "react";
import BlockListItem from "./BlockListItem";
import "./BlockList.css";

class BlockList extends Component {

  render() {
    
    return (
      <div className="blockList">
        {   
            this.props.lastTenBlocks.map( (block, i) => {
                return (
                    <div key={i}> 
                        <BlockListItem 
                            block={block}
                            index={i}
                            web3={this.props.web3}
                        />
                    </div>
                );
            })
        }
      </div>
    );
  }
}

export default BlockList;