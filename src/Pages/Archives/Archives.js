import React, { Component} from 'react'
import TheHeader from '@components/Header/Header'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { Layout, Row, Col, Spin } from 'antd'
import { connect } from 'react-redux'
import { loadBlogs } from '../../redux/store'
import TheFooter from '@components/Footer/Footer'
import PageLoading from '@components/PageLoading/PageLoading'
import config from '../../../config.json'

import './Archives.styl'

const { Content } = Layout

const Article = (blog) => (
  <div className="article-title">
    <span>-</span>
    <Link to={`/articles/${blog.id}`} className="articleLink">
      <span style={{ margin: '0 10px' }}>{blog.time}</span>
      <span>{blog.title}</span>
    </Link>

  </div>
)

@connect(
  state => state,
  { loadBlogs }
)
class Archives extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.getArchives()
  }

  getArchives () {
    Axios.get(`${config.server_url}/blog/getblogs`)
      .then(res => {
        res.data.blogs.map(blog => {
          blog.time = blog.time.split('T')[0]
        })
        this.props.loadBlogs(res.data)
      })
  }

  render () {
    return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col className="main-content" xs={{ span: 24 }} xl={{ offset: 4, span: 12 }} xxl={{ offset: 4, span: 12 }} >
              <Row>
                <Col xs={{ offset: 0 }} xl={{ offset: 2 }} xxl={{ offset: 2 }}>
                  <span className="blog-title">目前共计 {this.props.blogs ? this.props.blogs.length : 0} 篇博客, ⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾继续加油！</span>
                  {this.props.blogs ? this.props.blogs.map(blog => <Article key={blog.id} {...blog} />) :<PageLoading />}
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

export default Archives
