const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '어드민',
    value: '',
    result: '',
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length -1 ] === this.state.value[0]) {
      this.setState((prevState) => {
        return {
          word: prevState.value,
          result: 'O',
          value: '',
        }
      });
      this.input.focus();
    } else {
      this.setState({
        result: 'X',
        value: '',
      });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.currentTarget.value });
  }

  input;

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    )
  }
}

module.exports = WordRelay_class;