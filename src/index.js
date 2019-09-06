import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Hello from '@components/Hello';
// import { AppContainer } from 'react-hot-loader';

class App extends Component {
  render () {
    return <Hello></Hello>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// 模块热更替开启
if (module.hot) {
  module.hot.accept();
}
