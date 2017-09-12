import React, { Component } from "react";
import logo from "./logo.svg";
import messagesTop from "./img/messenger-top.png";
import headerRight from "./img/header-right.png";
import chatControls from "./img/chat-controls.png";
import ReactDOM from "react-dom";

import "./App.css";
import { height, width } from "./utils/dimensions";

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

class ChatBody extends Component {
  render() {
    return (
      <div className="chat-body" style={{ height: height - 100 }}>
        {this.props.chats.map(chat => (
          <div>
            <span className={chat.rule}>{chat.text}</span>
          </div>
        ))}
      </div>
    );
  }
}

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

class Chat extends Component {
  render() {
    return (
      <div className="chat" style={{ height }}>
        <ChatHeader name={this.props.name} time={this.props.time} />
        <ChatBody chats={this.props.chats} />
        <ChatControls submit={this.props.submit} />
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      chats: []
    };
    this.submitChat = this.submitChat.bind(this);
  }
  submitChat(text) {
    const chats = this.state.chats.concat({
      text,
      rule: "sender",
      key: Date.now()
    });
    this.setState({ chats });
  }
  componentDidMount() {
    fetch("https://randomuser.me/api/?page=1&results=30", {
      method: "GET"
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            data: json.results,
            loading: false
          });
        });
      }
    });

    ReactDOM.findDOMNode(this).addEventListener(
      "click",
      event => {
        event.stopPropagation();
      },
      false
    );
  }
  render() {
    return (
      <div className="App" style={{ height }}>
        {this.state.loading ? (
          "Loading"
        ) : (
          <Chat
            name={
              this.state.data[0].name.first + " " + this.state.data[0].name.last
            }
            time={this.state.data[0].registered}
            chats={this.state.chats}
            submit={this.submitChat}
          />
        )}

        <div className="messages">
          <img src={messagesTop} className="messages-top" />
          {this.state.loading ? (
            "Loading..."
          ) : (
            this.state.data.map(el => (
              <UserRow
                avatar={el.picture.large}
                userName={el.name.first + el.name.last}
                details={el.location.street}
                key={el.login.salt}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
