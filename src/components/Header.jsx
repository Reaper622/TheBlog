import React, { useState, useCallback } from 'react'
import { Layout, Menu, Icon, Row, Col, Avatar } from 'antd'
import BackgroundPic from '@assets/bg.jpg'
import AvatarPic from '@assets/avatar.jpg'

const { Header, Content, Footer } = Layout

function TheLayout() {
  const [tabKey, setTabKey] = useState('index')
  const switchTab = useCallback((index) => {
    setTabKey(index)
  }, [tabKey])
  return (
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
        <Row type="flex" justify="center" style={{marginTop: 380}}>
          <Col span={12}>
            <div className="intro">
              <Row type="flex" justify="center" style={{paddingTop: '10px'}}>
                <Col span={4}>
                  <img src={AvatarPic} alt="头像" style={{width: '100%', borderRadius: '50%'}} />
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={20} className="bio">
                  Grow strong or die out.
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <style jsx>{`
        .layout-header {
          padding: 0px;
          height: 600px;
          background: url(${BackgroundPic});
          background-size: 100%;
          position: relative;
          margin-bottom: 75px;
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
        .intro {
          width: 100%;
          height: 250px;
          background: rgba(160, 216, 243, 0.5);
          border-radius: 5px;
        }
        .bio {
          text-align: center;
          font-size: 24px;
          font-weight: 800;
        }
    `}</style>
      </Header>
  )
}
export default TheLayout