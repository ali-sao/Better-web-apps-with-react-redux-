import React, { Component } from "react";
import { height, width } from "../../utils/dimensions";

import ChatHeader from "./Header";
import ChatBody from "./Body";
import ChatControls from "./Controls";

import { connect } from 'react-redux'
import { sendMessage } from '../../actions'

class Chat extends Component {
  render() {
    return (
      <div className="chat" style={{ height, width: width - 360 }}>
        <ChatHeader name={this.props.name} time={this.props.time} />
        <ChatBody chats={this.props.chats} />
        <ChatControls submit={this.props.onSendMessage} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
    chats: state.chats
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSendMessage: text => {
      dispatch(sendMessage(text))
    }
  }
}

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)

export default ChatContainer;
