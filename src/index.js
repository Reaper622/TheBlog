import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { reducer } from './redux/store'

import 'antd/dist/antd.css'
import './index.css'

// 加载框
import PageLoading from '@components/PageLoading'

// 页面
import Index from './Pages/Index'
import Article from './Pages/Articles'

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__(): f => f
))


class App extends Component {
  render () {
    return (
      <Provider store={store}>
        {/* <BrowserRouter> */}
        <HashRouter>
            <Switch>
              <Route path='/' exact component={Index} />
              <Route path='/articles/:id' component={Article} />
            </Switch>
          </HashRouter>
        {/* </BrowserRouter> */}
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// 模块热更替开启
if (module.hot) {
  module.hot.accept()
}
