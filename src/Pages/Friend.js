import React, {Component} from 'react'
import TheHeader from '@components/Header'
import {Layout, Row, Col, Card, Avatar, Icon} from 'antd'
import { connect } from 'react-redux'
import TheFooter from '@components/Footer'
import config from '../../config.json'

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
        <TheHeader  current={'archives'}></TheHeader>
        <Content>
          <Row>
            <Col offset={4}  span={12}  style={{background: '#fff', minHeight: '600px' , padding: '20px 50px'}}>
              <Row type="flex" justify="start">
                {config.friends.length ? config.friends.map(person => <FriendCard {...person} key={person.name} />) :<Col><span>当前还未有友链哦，立即申请吧！</span></Col>}
              </Row>
            </Col>
          </Row>
        </Content>
        <TheFooter></TheFooter>
        <style jsx>{`
          `}</style>
      </Layout>
    )
  }
}

export default Friend