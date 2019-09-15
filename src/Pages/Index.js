import React, {Component} from 'react'
import TheHeader from '@components/Header'
import Blog from '@components/Blog'
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
    console.log('props', this.props.blogs)

    return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col offset={4}  span={12} style={{}} >
              { this.props.blogs ? this.props.blogs.map(blog => <Blog key={blog.id} {...blog} isPriview={true} />) : null}
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Index