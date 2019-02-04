import React, { Component } from "react";
import BlockListItem from "./BlockListItem";
import "./BlockList.css";

class BlockList extends Component {

  constructor(props) {
    super(props);
  }

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