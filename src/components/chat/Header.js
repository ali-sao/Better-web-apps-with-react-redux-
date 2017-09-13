import React, { Component } from "react";

import headerRight from "../../img/header-right.png";
import { width } from "../../utils/dimensions";

class ChatHeader extends Component {
  render() {
    return (
      <div className="header" style={{ width: width - 360 }}>
        <img src={headerRight} />
        <div className="header-text">
          <h1>{this.props.name}</h1>
          <span>{this.props.time}</span>
        </div>
      </div>
    );
  }
}
export default ChatHeader;
