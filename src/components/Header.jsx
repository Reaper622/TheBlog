import React, { useState, useCallback } from 'react'
import {withRouter, Link} from 'react-router-dom'
import { Layout, Menu, Icon, Row, Col, Avatar, Dropdown } from 'antd'
import BackgroundPic from '@assets/bg.jpg'
import config from '../../config.json'
import ScrollTop from './ScrollTop'

const { Header } = Layout

const LinkMeMore = (
  <Menu style={{background: 'rgba(122, 123, 126, 0.5)'}}>
      <Menu.Item className="menu-item drop-item" key="github" >
        <a style={{color: '#fff'}} target="_blank" href="https://github.com/Reaper622">GitHub</a>
      </Menu.Item>
      <Menu.Item className="menu-item drop-item" key="juejin" >
        <a style={{color: '#fff'}} target="_blank" href="https://juejin.im/user/5ba1aed3e51d453eb93d4dfd">掘金</a>
      </Menu.Item>
      <Menu.Item className="menu-item drop-item" key="gmail" >
        <a style={{color: '#fff'}} target="_blank" href="mailto:reaperlee622@gmail.com">Gmail</a>
      </Menu.Item>
  </Menu>
)

function TheLayout({location, history}) {
  const [tabKey, setTabKey] = useState(location.pathname.split('/')[1] || 'index')
  const [isAvatarHover, setIsAvatarHover] = useState(false)
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
          <Menu.Item className="menu-item" onClick={() => switchTab('')} key="index"><Icon type="home" />首页</Menu.Item>
          <Menu.Item className="menu-item" key="link">
            <Dropdown overlay={LinkMeMore} placement="bottomCenter" trigger={['hover']} overlayStyle={{width: 100, backgroundColor: 'rgba(122, 123, 126, 0.5)'}}>
              <span><Icon type="link" />Link Me</span>
            </Dropdown>
          </Menu.Item>
          <Menu.Item className="menu-item" onClick={() => switchTab('resume')} key="resume"><Icon type="solution" />简历</Menu.Item>
          <Menu.Item className="menu-item" onClick={() => switchTab('archives')} key="archives"><Icon type="folder" />归档</Menu.Item>
          <Menu.Item className="menu-item" onClick={() => switchTab('friend')} key="friend"><Icon type="team" />友链</Menu.Item>
          {/* <Menu.Item className="menu-item" onClick={() => switchTab('message')} key="message"><Icon type="highlight" />留言</Menu.Item> */}
          <a href="https://github.com/Reaper622/TheBlog" target="__blank" className="github-right" key="github"><Icon type="github" /> Fork Me</a>
        </Menu>
        <Row type="flex" justify="center" style={{marginTop: 380}}>
          <Col span={12}>
            <div className="intro">
              <Row type="flex" justify="center" style={{paddingTop: '10px'}}>
                <Col span={4}>
                  <img src={config.avatar_url} alt="头像" onMouseEnter={() => setIsAvatarHover(true)} onMouseOut={() => setIsAvatarHover(false)}  className={isAvatarHover? 'animated swing duration-2s' : ''} style={{width: '100%', borderRadius: '50%'}} />
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={20} className="bio">
                  {config.bio}
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
        .github-right {
          color: #fff;
          font-size: 20px;
          float: right;
          margin-right: 20px;
        }
    `}</style>
    <style global jsx>
      {`
      .ant-dropdown-menu-item-active {
          color: #1890FF;
          background:rgba(160, 216, 243, 0.5);
        }
        .ant-dropdown-menu-item:hover {
          color: #1890FF;
          background:rgba(160, 216, 243, 0.5);
        }
      `}
    </style>
      </Header>
  )
}
export default withRouter(TheLayout)