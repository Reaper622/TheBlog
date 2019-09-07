import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import Layout from '@components/Layout'
// import { AppContainer } from 'react-hot-loader';

class App extends Component {
  render () {
    return (<Layout></Layout>)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// 模块热更替开启
if (module.hot) {
  module.hot.accept()
}
