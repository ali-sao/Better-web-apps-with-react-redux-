import React, { Component } from "react";

import chatControls from "../../img/chat-controls.png";

class ChatControls extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.state = {
      input: ""
    };
  }
  onInput(e) {
    this.setState({
      input: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state.input);
    this.setState({ input: "" });
  }
  render() {
    return (
      <div className="chat-controls">
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.input}
            onChange={this.onInput}
            placeholder="Type a message..."
            className="text-input"
          />
          <input
            type="submit"
            onClick={this.props.submit}
            className="submit-button"
          />
        </form>
        <img src={chatControls} />
      </div>
    );
  }
}
export default ChatControls;
