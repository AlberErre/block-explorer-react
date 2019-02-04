import React, { Component } from "react";
import { Table, TableHeader, TableRow, TableCell, Text, Badge, DropDown } from '@aragon/ui';
import "./BlockListItem.css";

class BlockListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeItem: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index) {
    this.setState({ 
      activeItem: index 
    })
  }

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
            <DropDown
              items={this.props.block.blockTransactions}
              active={this.state.activeItem}
              onChange={this.handleChange}
            />
            </TableCell>

          </TableRow>
        </Table>

      </div>
    );
  }
}

export default BlockListItem;