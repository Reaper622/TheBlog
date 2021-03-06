import React, { useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, Dropdown } from 'antd'
import config from '../../../config.json'

import ScrollTop from '../ScrollTop/ScrollTop'
import IntroArea from '../IntroArea/IntroArea'

import './Header.styl'

const { Header } = Layout

const LinkMeMore = (
  <Menu style={{ background: 'rgba(122, 123, 126, 0.5)' }}>
    <Menu.Item className="menu-item drop-item" key="github" >
      <a style={{ color: '#fff' }} target="_blank" href="https://github.com/Reaper622">GitHub</a>
    </Menu.Item>
    <Menu.Item className="menu-item drop-item" key="juejin" >
      <a style={{ color: '#fff' }} target="_blank" href="https://juejin.im/user/5ba1aed3e51d453eb93d4dfd">掘金</a>
    </Menu.Item>
    <Menu.Item className="menu-item drop-item" key="gmail" >
      <a style={{ color: '#fff' }} target="_blank" href="mailto:reaperlee622@gmail.com">Gmail</a>
    </Menu.Item>
  </Menu>
)

const KnowLedge = (
  <Menu style={{ background: 'rgba(122, 123, 126, 0.5)' }}>
    <Menu.Item className="menu-item drop-item" key="github" >
      <a style={{ color: '#fff' }} target="_blank" href="https://reaperlee.cn/ds-al/">数据结构和算法</a>
    </Menu.Item>
    <Menu.Item className="menu-item drop-item" key="juejin" >
      <a style={{ color: '#fff' }} target="_blank" href="https://reaperlee.cn/dp/">设计模式</a>
    </Menu.Item>
  </Menu>
)

const TheLayout = React.memo(function TheLayout ({ location, history }) {
  const [tabKey, setTabKey] = useState(location.pathname.split('/')[1] || 'index')
  const switchTab = useCallback((index) => {
    setTabKey(index)
    history.push(index)
  }, [tabKey])
  return (
    <Header className="layout-header">
      <ScrollTop />
      <Menu
        theme="dar"
        mode="horizontal"
        defaultSelectedKeys={[`${tabKey}`]}
        className="header-menu"
      >
        <Menu.Item className="menu-item" onClick={() => switchTab('')} key="index"><Icon className="menu-icon" type="home" />首页</Menu.Item>
        <Menu.Item className="menu-item" key="link">
          <Dropdown overlay={LinkMeMore} placement="bottomCenter" trigger={['hover']} overlayStyle={{ width: 100, backgroundColor: 'rgba(122, 123, 126, 0.5)' }}>
            <span><Icon className="menu-icon" type="link" />Link Me</span>
          </Dropdown>
        </Menu.Item>
        <Menu.Item className="menu-item" onClick={() => window.location.href ='https://reaperlee.cn/resume/'} key="resume"><Icon className="menu-icon" type="solution" />简历</Menu.Item>
        <Menu.Item className="menu-item" onClick={() => switchTab('/archives')} key="archives"><Icon className="menu-icon" type="folder" />归档</Menu.Item>
        <Menu.Item className="menu-item" onClick={() => switchTab('/friend')} key="friend"><Icon className="menu-icon" type="team" />友链</Menu.Item>
        {/* <Menu.Item className="menu-item" onClick={() => switchTab('message')} key="message"><Icon type="highlight" />留言</Menu.Item> */}
        <Menu.Item className="menu-item" key="knowledge">
          <Dropdown overlay={KnowLedge} placement="bottomCenter" trigger={['hover']} overlayStyle={{ width: 120, backgroundColor: 'rgba(122, 123, 126, 0.5)' }}>
            <span><Icon className="menu-icon" type="deployment-unit" />知识库</span>
          </Dropdown>
        </Menu.Item>
        <a href="https://github.com/Reaper622/TheBlog" target="__blank" className="github-right" key="github"><Icon type="github" /> Fork Me</a>
      </Menu>
      <IntroArea config={config} />
    </Header>
  )
})

export default withRouter(TheLayout)
