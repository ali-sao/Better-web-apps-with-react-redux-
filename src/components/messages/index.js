import React, { Component } from "react";

import messagesTop from "../../img/messenger-top.png";
import UserRow from "./UserRow";

import { connect } from 'react-redux'

class Messeges extends Component {
  render() {
    return (
      <div className="messages">
        <img src={messagesTop} className="messages-top" />
        {this.props.conversations.map(el => (
          <UserRow
            avatar={el.picture.large}
            userName={el.name.first + el.name.last}
            details={el.location.street}
            key={el.login.salt}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {conversations: state.data}
}

const mapDispatchToProps = dispatch => {
  return { }
}

const MessegesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messeges)

export default MessegesContainer;
