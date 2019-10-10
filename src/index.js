import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import Loadable from 'react-loadable'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { reducer } from './redux/store'

// import 'antd/dist/antd.css'
import './index.css'
import 'animate.css/animate.min.css'

// 加载框
import PageLoading from '@components/PageLoading'

// 页面
// import Index from './Pages/Index'
import Article from './Pages/Articles'
// import Archives from './Pages/Archives'
// import Friend from './Pages/Friend'
// 动态路由加载，提升用户感受
const AsyncIndex = Loadable({
  loading: PageLoading ,
  timeout: 1000,
  loader: () => import('./Pages/Index')
})
// const AsyncArticle = Loadable({
//   loading: PageLoading ,
//   timeout: 1000,
//   loader: () => import('./Pages/Articles')
// })
const AsyncArchives = Loadable({
  loading: PageLoading ,
  timeout: 1000,
  loader: () => import('./Pages/Archives')
})
const AsyncFriend = Loadable({
  loading: PageLoading ,
  timeout: 1000,
  loader: () => import('./Pages/Friend')
})

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
              <Route path='/' exact component={AsyncIndex} />
              <Route path='/articles/:id' component={Article} />
              <Route path='/archives' component={AsyncArchives} />
              <Route path='/friend' component={AsyncFriend} />
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
