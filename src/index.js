import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { reducer } from './redux/store'

import 'antd/dist/antd.css'
import './index.css'

// 页面
import Index from './Pages/Index'

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__(): f => f
))


class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Index} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// 模块热更替开启
if (module.hot) {
  module.hot.accept()
}
