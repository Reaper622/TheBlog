import React, {Component} from 'react'
import TheHeader from '@components/Header'
import TheFooter from '@components/Footer'
import Blog from '@components/Blog'
import Axios from 'axios'
import {Layout, Row, Col, Pagination, Spin} from 'antd'
import { connect } from 'react-redux'
import {loadBlogsByPage} from '../redux/store'

const { Content } = Layout

@connect(
  state => state,
  {loadBlogsByPage}
)
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }



  componentDidMount() {
    this.getBlogs(0)
  }

  getBlogs(page) {
    this.setState({ loading: true})
    Axios.get(`http://127.0.0.1:4000/blog/getblogs/${page}`)
      .then(res => {
        res.data.blogs.map(blog => {
          blog.time = blog.time.split('T')[0]
        })
        this.setState({ loading: false})
        this.props.loadBlogsByPage(res.data)
      })
  }

  handlePageChange(page) {
    
    this.getBlogs(page - 1)
  }

  render() {
    return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col offset={4}  span={12} >
              <Spin spinning={this.state.loading} style={{minHeight: '1000 px'}}>
                { this.props.blogsToShow ? this.props.blogsToShow.map(blog => <Blog key={blog.id} {...blog} isPriview={true} />) : null}
              </Spin>
            </Col>
          </Row>
          <Row style={{margin: '20px 0 50px'}}>
            <Col offset={4} span={12} style={{padding: '20px 0', background: '#fff', display: 'flex', justifyContent: 'center'}}>
              <Pagination defaultCurrent={1} defaultPageSize={5} total={this.props.blogsCount} onChange={(page) => this.handlePageChange(page)} />
            </Col>
          </Row>
        </Content>
        <TheFooter></TheFooter>
      </Layout>
    )
  }
}

export default Index