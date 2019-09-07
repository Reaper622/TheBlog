import React, { useState, useCallback } from 'react'
import { Layout, Menu, Icon } from 'antd'
import BackgroundPic from '@assets/bg.jpg'

const { Header, Content, Footer } = Layout

function TheLayout() {
  const [tabKey, setTabKey] = useState('index')
  const switchTab = useCallback((index) => {
    setTabKey(index)
  }, [tabKey])
  return (
    <Layout>
      <Header className="layout-header">
        <Menu
          theme="dar"
          mode="horizontal"
          defaultSelectedKeys={[`${tabKey}`]}
          className="header-menu"
        >
          <Menu.Item className="menu-item" onClick={() => switchTab('index')} key="index"><Icon type="home" />首页</Menu.Item>
          <Menu.Item className="menu-item" onClick={() => switchTab('link')} key="link"><Icon type="link" />Link Me</Menu.Item>
          <Menu.Item className="menu-item" onClick={() => switchTab('resume')} key="resume"><Icon type="solution" />简历</Menu.Item>
          <Menu.Item className="menu-item" onClick={() => switchTab('record')} key="record"><Icon type="folder" />归档</Menu.Item>
          <Menu.Item className="menu-item" onClick={() => switchTab('friend')} key="friend"><Icon type="team" />友链</Menu.Item>
          <Menu.Item className="menu-item" onClick={() => switchTab('message')} key="message"><Icon type="highlight" />留言</Menu.Item>
        </Menu>
        
      </Header>
      <style jsx>{`
        .layout-header {
          padding: 0px;
          height: 600px;
          background: url(${BackgroundPic});
          background-size: 100%;
        }
        .header-menu {
          width: 100%;
          line-height: 40px;
          padding-left: 200px;
          background: rgba(122, 123, 126, 0.5);
          border: 0;
          color: #fff;
        }
        .menu-item {
          margin: 0px 5px;
        }
    `}</style>
    </Layout>
  )
}
export default TheLayout