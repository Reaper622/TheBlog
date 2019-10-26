import React, { Component } from 'react'
import TheHeader from '@components/Header/Header'
import { Layout, Row, Col, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import TheFooter from '@components/Footer/Footer'
import config from '../../../config.json'

import './Friend.styl'

const { Content } = Layout

const FriendCard = ({ avatar, name, intro, path }) => (

  <Col className="card">
    <a href={path} target="__blank">
      <img src={avatar} />
      <div className="content">
        <span className="name">{name}</span>
        <p className="intro-content">{intro}</p>
      </div>
    </a>
  </Col>
)

@connect(
  state => state
)
class Friend extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    console.log(config)
  }

  render () {
    return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col className="main" xs={{ span: 24 }} xl={{ offset: 4, span: 12 }} xxl={{ offset: 4, span: 12 }} >
              <Row type="flex" justify="space-around">
                {config.friends.length ? config.friends.map(person => <FriendCard {...person} key={person.name} />) : <Col><span>当前还未有友链哦，立即申请吧！</span></Col>}
              </Row>
            </Col>
            <Col className="aside" offset={1} span={3} >
              <Row type="flex" justify="center">
                <Col span={12}>
                  <a target="__blank" href="https://github.com/Reaper622/TheBlog/issues"><Button type="primary"><Icon type="bulb" />申请友链</Button></a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <TheFooter></TheFooter>
      </Layout>
    )
  }
}

export default Friend
