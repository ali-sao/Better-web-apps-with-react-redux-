import React, { Component } from "react";
import { height, width } from "../../utils/dimensions";

import ChatHeader from "./Header";
import ChatBody from "./Body";
import ChatControls from "./Controls";

class Chat extends Component {
  render() {
    return (
      <div className="chat" style={{ height, width: width - 360 }}>
        <ChatHeader name={this.props.name} time={this.props.time} />
        <ChatBody chats={this.props.chats} />
        <ChatControls submit={this.props.submit} />
      </div>
    );
  }
}
export default Chat;
