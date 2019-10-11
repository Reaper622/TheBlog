import React, {Component} from 'react'
import TheHeader from '@components/Header/Header'
import {Layout, Row, Col, Card, Avatar, Icon, Button} from 'antd'
import { connect } from 'react-redux'
import TheFooter from '@components/Footer/Footer'
import config from '../../../config.json'

const { Content } = Layout


const FriendCard = ({avatar, name, intro, path}) => (
  <Col span={10} offset={2}>
    <Card 
    style={{width: '300px', margin: '20px 0'}}
    actions={
      [<a target="__blank" href={path} style={{fontSize: '20px'}}><Icon type="home" /></a>]
    }>
      <Card.Meta
       avatar={<Avatar src={avatar} />}
       title={name}
       description={intro}       />
    </Card>
  </Col>
)


@connect(
  state => state,
)
class Friend extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    console.log(config)
  }


  render() {
    return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col offset={4}  span={12}  style={{background: '#fff', minHeight: '600px' , padding: '20px 50px'}}>
              <Row type="flex" justify="start">
                {config.friends.length ? config.friends.map(person => <FriendCard {...person} key={person.name} />) :<Col><span>当前还未有友链哦，立即申请吧！</span></Col>}
              </Row>
            </Col>        
            <Col offset={1} span={3} style={{background: '#fff', minHeight: '300px', padding: '20px 0' }}>
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