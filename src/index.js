import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import Loadable from 'react-loadable'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { reducer } from './redux/store'
import './service-worker.js'

import './index.styl'
// import 'animate.css/animate.min.css'

// 加载框
import PageLoading from '@components/PageLoading/PageLoading'

// 页面
// import Index from './Pages/Index'
import Article from './Pages/Articles/Articles'
// import Archives from './Pages/Archives'
// import Friend from './Pages/Friend'
// 动态路由加载，提升用户感受
const AsyncIndex = Loadable({
  loading: PageLoading,
  timeout: 1000,
  loader: () => import('./Pages/Index/Index')
})
// const AsyncArticle = Loadable({
//   loading: PageLoading ,
//   timeout: 1000,
//   loader: () => import('./Pages/Articles')
// })
const AsyncArchives = Loadable({
  loading: PageLoading,
  timeout: 1000,
  loader: () => import('./Pages/Archives/Archives')
})
const AsyncFriend = Loadable({
  loading: PageLoading,
  timeout: 1000,
  loader: () => import('./Pages/Friend/Friend')
})

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
        {/* <HashRouter> */}
          <Switch>
            <Route path='/' exact component={AsyncIndex} />
            <Route path='/articles/:id' component={Article} />
            <Route path='/archives' component={AsyncArchives} />
            <Route path='/friend' component={AsyncFriend} />
          </Switch>
        {/* </HashRouter> */}
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

// 注册 service-worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then( function (registration) {
      console.log(`service worker 在 ${registration.scope} 范围下注册成功`);
    }, function (err) {
      console.log('service worker 注册失败', err)
    })
  })
}