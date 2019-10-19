import React, {Component} from 'react'
import TheHeader from '@components/Header/Header'
import TheFooter from '@components/Footer/Footer'
import Blog from '@components/Blog/Blog'
import Axios from 'axios'
import {Layout, Row, Col, Pagination} from 'antd'
import { connect } from 'react-redux'
import {loadBlogsByPage} from '../../redux/store'
import config from '../../../config.json'
import { CSSTransition } from 'react-transition-group'

const { Content } = Layout

import './Index.styl'

@connect(
  state => state,
  {loadBlogsByPage}
)
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }



  componentDidMount() {
    this.getBlogs(0)
  }

  getBlogs(page) {
    Axios.get(`${config.server_url}/blog/getblogs/${page}`)
    .then(res => {
      res.data.blogs.map(blog => {
        blog.time = blog.time.split('T')[0]
      })
      this.setState({ loaded: true})
      this.props.loadBlogsByPage(res.data)
    })
  }
  
  handlePageChange(page) {
    this.setState({ loaded: false})
    this.getBlogs(page - 1)
  }

  render() {
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
            <Col xs={{span:24}} xl={{offset:4, span:12}} xxl={{offset:4, span:12}} style={{minHeight: '600px'}} >
                { this.props.blogsToShow ? this.props.blogsToShow.map(blog => <Blog key={blog.id} {...blog} isPriview={true} />) : <div></div>}
            </Col>
          </CSSTransition>
          </Row>
          <Row style={{margin: '20px 0 50px'}}>
            <Col xs={{span:24}} xl={{offset:4, span:12}} xxl={{offset:4, span:12}}  style={{padding: '20px 0', background: '#fff', display: 'flex', justifyContent: 'center'}}>
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