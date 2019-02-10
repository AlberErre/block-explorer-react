import React, { Component } from "react";
import Moment from 'react-moment';
import { Text, Badge } from '@aragon/ui';
import "./MainInfo.css";

class MainInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      badgeStyles: {
        greyBackground: "#dceaef",
        greyTextColor: "#6d8088",
        greenBackground: "#21d48f",
        greenTextColor: "white",
        blueEagleBackground: "#00cbe6",
      }
    };
  }

  render() {

    const { badgeStyles } = this.state;

    return (
      <div className="headerContainer">

        <div className="headerGroupItem mobileTopInfo">

          <div className="4">
            <Text size="xlarge">
              Last block
            </Text>
            <div className="currentBlockNumberContainer">
              <Badge shape="compact"
              background={"transparent"} 
              foreground={"white"}>
                <div className="currentBlockNumber">
                  {this.props.lastBlockNumber}            
                </div>
              </Badge>
            </div>
          </div>

          <div className="headerInnerItem">
            <Text size="small">
              Time since last block
            </Text>
            <span>
              <Badge shape="compact"
                background={badgeStyles.greyBackground} 
                foreground={badgeStyles.greyTextColor}>
                  <div className="timeAgo">
                    <Moment durationFromNow interval={1000} ago>
                      {new Date(this.props.lastBlockTime*1000)}
                    </Moment>   
                  </div>      
              </Badge>
            </span>
          </div>

        </div>

        <div className="headerGroupItem mobileBottomInfo">

          <div className="headerInnerItem">
            <span>Network ID</span>
            <span>
              <Badge shape="compact"
                background={badgeStyles.greyBackground} 
                foreground={badgeStyles.greyTextColor}
                style={{paddingRight: "5px",paddingLeft: "5px"}}>
                {this.props.networkId}            
              </Badge>
            </span>
          </div>

          <div className="headerInnerItem">
            <span>Gas used</span>
            <span>
              <Badge shape="compact"
                background={badgeStyles.greyBackground} 
                foreground={badgeStyles.greyTextColor}>
                {this.props.gasUsedOnBlock}            
              </Badge>
            </span>
          </div>

          <div className="headerInnerItem">
            <span>Difficulty</span>
            <span>
              <Badge shape="compact"
                background={badgeStyles.greyBackground} 
                foreground={badgeStyles.greyTextColor}>
                {this.props.difficulty}            
              </Badge>
            </span>
          </div>
        </div>

        <div className="headerGroupItem mobileBottomInfo">
          <div className="headerInnerItem">
            <span>Block size</span>
            <span>
              <Badge shape="compact"
                background={badgeStyles.greyBackground} 
                foreground={badgeStyles.greyTextColor}>
                {this.props.lastBlockSize}            
              </Badge>
            </span>

          </div>

          <div className="headerInnerItem">
            <span>Timestamp</span>
            <span>
              <Badge shape="compact"
                background={badgeStyles.greyBackground} 
                foreground={badgeStyles.greyTextColor}>
                {this.props.lastBlockTime}            
              </Badge>
            </span>
          </div>

          <div className="headerInnerItem mainBlockHash">
            <span>Block hash</span>
            <Badge shape="compact"
              background={badgeStyles.greyBackground} 
              foreground={badgeStyles.greyTextColor}>
              {this.props.lastBlockHash}            
            </Badge>
          </div>

        </div>

      </div>
    );
  }
}

export default MainInfo;