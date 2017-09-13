import React, { Component } from "react";

class UserRow extends Component {
  render() {
    return (
      <div className="user-row">
        <img src={this.props.avatar} alt={this.props.avatar} />
        <div className="text-data">
          <h2>{this.props.userName}</h2>
          <p>{this.props.details}</p>
        </div>
      </div>
    );
  }
}

export default UserRow;
