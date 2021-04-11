import React, { Component } from "react";

import Home from "./App/Pages/Home/Home";
import Chat from "./App/Pages/Chat/Chat";

import {connect} from 'react-redux'

class App extends Component {

  state = {
    mode: true,
  }

  onEnter(e) {
    //e will be topics list separated by space
    let topics = e.split(" ")

    this.props.setTopic(topics)
    this.setState({mode: false})
  }

  render() {
    return (
      <div className="App">
        { this.state.mode ?
          <Home onEnter={this.onEnter.bind(this)} /> :
          <Chat />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setTopic : t => dispatch({type:'topics', content:t})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
