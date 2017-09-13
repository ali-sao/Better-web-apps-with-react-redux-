import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { height } from "./utils/dimensions";

import Chat from "./components/chat";
import Messeges from "./components/messages";

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

    setInterval(() => {
      fetch("http://www.randomtext.me/api/gibberish/h1/1-11", {
        method: "GET"
      }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            const chats = this.state.chats.concat({
              text: json.text_out.replace("<h1>", "").replace("</h1>"),
              rule: "reciever",
              key: Date.now()
            });
            this.setState({ chats });
          });
        }
      });
    }, (Math.random() * 10 + 5) * 1000);

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
          <div>
            <Chat
              name={
                this.state.data[0].name.first +
                " " +
                this.state.data[0].name.last
              }
              time={this.state.data[0].registered}
              chats={this.state.chats}
              submit={this.submitChat}
            />
            <Messeges data={this.state.data} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
