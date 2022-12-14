import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: 'CLICK TO START',
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: 'READY...',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: 'CLICK!',
        })
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') { // too fast message
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: 'TOO EARLY',
      })
    } else if (state === 'now') {   // response check
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: 'CLICK TO START',
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0
      ? null
      : <>
          <div>RESPONSE AVERAGE: {result.reduce((a, c) => a + c) / result.length}ms</div>
          <button onClick={this.onReset}>RESET</button>
        </>
  }

  render() {
    const { state, message, result } = this.state;
    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClickScreen}
        >
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  };
}

export default ResponseCheck;