import React, { PureComponent } from 'react'
import TheHeader from '@components/Header/Header'
import TheFooter from '@components/Footer/Footer'
import Blog from '@components/Blog/Blog'
import SideMenu from '@components/SideMenu/SideMenu'
import Axios from 'axios'
import { Layout, Row, Col, Pagination } from 'antd'
import { connect } from 'react-redux'
import { loadBlogsByPage, loadHotArticles, loadShowPage } from '../../redux/store'
import config from '../../../config.json'
import { CSSTransition } from 'react-transition-group'

import './Index.styl'

const { Content } = Layout

@connect(
  state => state,
  { loadBlogsByPage, loadHotArticles, loadShowPage }
)
class Index extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount () {
    if (!this.props.blogsToShow || !this.props.hotArticles) {
      this.getBlogs(0)
      this.getHotArticles()
    }
  }

  getBlogs (page) {
    Axios.get(`${config.server_url}/blog/getblogs/${page}`)
      .then(res => {
        res.data.blogs.map(blog => {
          blog.time = blog.time.split('T')[0]
        })
        this.setState({ loaded: true })
        this.props.loadBlogsByPage(res.data)
        this.props.loadShowPage(page)
      })
  }

  getHotArticles () {
    Axios.get(`${config.server_url}/blog/gethotarticle`)
      .then(res => {
        this.props.loadHotArticles(res.data)
      })
  }

  handlePageChange (page) {
    this.setState({ loaded: false })
    this.getBlogs(page - 1)
  }

  render () {
    return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <CSSTransition
              in={this.state.loaded}
              timeout={2000}
              classNames='fade'
              appear={true}
            >
              <Col xs={{ span: 24 }} xl={{ offset: 4, span: 12 }} xxl={{ offset: 4, span: 12 }} style={{ minHeight: '600px' }} >
                { this.props.blogsToShow ? this.props.blogsToShow.map(blog => <Blog key={blog.id} {...blog} isPriview={true} />) : <div></div>}
              </Col>
            </CSSTransition>
            <Col xs={{ span: 0}} xl={{offset: 1, span: 5}} xxl={{offset: 1, span: 5}}>
                {this.props.hotArticles ? <SideMenu hotArticles={this.props.hotArticles} /> : null}
            </Col>
          </Row>
          <Row style={{ margin: '20px 0 50px' }}>
            <Col xs={{ span: 24 }} xl={{ offset: 4, span: 12 }} xxl={{ offset: 4, span: 12 }} style={{ padding: '20px 0', background: '#fff', display: 'flex', justifyContent: 'center' }}>
              <Pagination defaultCurrent={this.props.showPage} defaultPageSize={5} total={this.props.blogsCount} onChange={(page) => this.handlePageChange(page)} />
            </Col>
          </Row>
        </Content>
        <TheFooter></TheFooter>
      </Layout>
    )
  }
}

export default Index
