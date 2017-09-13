import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { height } from "./utils/dimensions";

import Chat from "./components/chat";
import Messeges from "./components/messages";

import { connect } from 'react-redux'
import { sendMessage, messagesLoaded, messageReceived } from './actions'

class App extends Component {

  componentDidMount() {
    fetch("https://randomuser.me/api/?page=1&results=30", {
      method: "GET"
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.props.onMessagesLoaded(json.results)
        });
      }
    });

    setInterval(() => {
      fetch("http://www.randomtext.me/api/gibberish/h1/1-11", {
        method: "GET"
      }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.props.onMessageReceived(json.text_out)
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
        {this.props.loading ? (
          "Loading"
        ) : (
          <div>
            <Chat
              name={
                  this.props.data[0].name.first +
                  " " +
                  this.props.data[0].name.last
              }
              time={this.props.data[0].registered}
              chats={this.props.chats}
              submit={this.props.onSendMessage.bind(this)}
            />
            <Messeges data={this.props.data} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    onSendMessage: text => {
      dispatch(sendMessage(text))
    },
    onMessagesLoaded: messages => {
      dispatch(messagesLoaded(messages))
    },
    onMessageReceived: message => {
      dispatch(messageReceived(message))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer;
