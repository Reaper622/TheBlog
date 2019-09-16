import React, {Component} from 'react'
import TheHeader from '@components/Header'
import {Layout, Row, Col} from 'antd'
import { connect } from 'react-redux'
import {loadBlogs} from '../redux/store'

const { Content } = Layout

const Article = (blog) => (
  <div style={{}}>
    <span>{blog.time}</span>
    <span onClick={() => {this.props.router.push(`/article/${blog.id}`)}}>{blog.title}</span>
  </div>
)

@connect(
  state => state,
  {loadBlogs}
)
class Archives extends Component {
  constructor(props) {
    super(props)
  }


  componentWillMount() {
    if (!this.props.blogs) {
      this.props.loadBlogs()
    }
  }


  render() {
    return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col offset={4}  span={12}  style={{background: '#fff', minHeight: 600}}>
              <Row>
                <Col offset={2}>
                  <span>目前共计{this.props.blogs ? this.props.blogs.length : 0}篇博客</span>
                  {this.props.blogs ? this.props.blogs.map(blog => <Article key={blog.id} {...blog} />) : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Archives