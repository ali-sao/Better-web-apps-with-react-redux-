import React, { Component } from "react";

import { height } from "../../utils/dimensions";

class ChatBody extends Component {
  render() {
    return (
      <div className="chat-body" style={{ height: height - 100 }}>
        {this.props.chats.map(chat => (
          <div key={Math.random(Date.now())}>
            <span className={chat.rule}>{chat.text}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default ChatBody;
