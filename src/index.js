import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'antd/dist/antd.css'
import './index.css'

import Index from './Pages/Index'


class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Index} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// 模块热更替开启
if (module.hot) {
  module.hot.accept()
}
