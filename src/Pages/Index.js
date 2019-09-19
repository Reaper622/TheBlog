import React, {Component} from 'react'
import TheHeader from '@components/Header'
import TheFooter from '@components/Footer'
import Blog from '@components/Blog'
import {Layout, Row, Col} from 'antd'
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

    return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col offset={4}  span={12} >
              { this.props.blogs ? this.props.blogs.map(blog => <Blog key={blog.id} {...blog} isPriview={true} />) : null}
            </Col>
          </Row>
        </Content>
        <TheFooter></TheFooter>
      </Layout>
    )
  }
}

export default Index