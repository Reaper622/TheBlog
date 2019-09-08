import React, {Component} from 'react'
import TheHeader from '@components/Header'
import {Layout, Row, Col} from 'antd'

const { Content } = Layout

class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col offset={4}  span={12} style={{border: '1px solid black', height: '2000px'}} ></Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Index