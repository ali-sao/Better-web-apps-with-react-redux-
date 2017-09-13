import React, { Component } from "react";

import messagesTop from "../../img/messenger-top.png";
import UserRow from "./UserRow";

class Messeges extends Component {
  render() {
    return (
      <div className="messages">
        <img src={messagesTop} className="messages-top" />
        {this.props.data.map(el => (
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

export default Messeges;
