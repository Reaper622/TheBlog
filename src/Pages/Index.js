import React, {Component} from 'react'
import TheHeader from '@components/Header'
import {Layout, Row, Col} from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
import {loadBlogs} from '../redux/store'

const { Content } = Layout

@connect(
  state => state,
  {loadBlogs}
)
class Index extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.loadBlogs()
  }


  render() {
    console.log(this.props.blogs)

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