import React, {Component} from 'react'
import TheHeader from '@components/Header'
import TheFooter from '@components/Footer'
import Blog from '@components/Blog'
import Axios from 'axios'
import {Layout, Row, Col, Pagination} from 'antd'
import { connect } from 'react-redux'
import {loadBlogsByPage} from '../redux/store'
import config from '../../config.json'
import { CSSTransition } from 'react-transition-group'

const { Content } = Layout

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
            <Col offset={4}  span={12} style={{minHeight: '600px'}} >
                { this.props.blogsToShow ? this.props.blogsToShow.map(blog => <Blog key={blog.id} {...blog} isPriview={true} />) : <div></div>}
            </Col>
          </CSSTransition>
          </Row>
          <Row style={{margin: '20px 0 50px'}}>
            <Col offset={4} span={12} style={{padding: '20px 0', background: '#fff', display: 'flex', justifyContent: 'center'}}>
              <Pagination defaultCurrent={1} defaultPageSize={5} total={this.props.blogsCount} onChange={(page) => this.handlePageChange(page)} />
            </Col>
          </Row>
        </Content>
        <TheFooter></TheFooter>
        <style jsx>{`
            /* enter 为入场前的瞬间， appear指页面第一次加载前的瞬间（auto） */
            .fade-enter, .fade-appear {
              opacity: 0;
            }
            /* enter-active 为入场到入场结束的过程 appear-active 为页面第一次自动执行 */
            .fade-enter-active, .fade-appear-active {
              opacity: 1;
              transition: opacity 1s ease-in;
            }
            /* 入场动画执行完毕后, 保持状态 */
            .fade-enter-done {
              opacity: 1;
            }
            /*出厂前的瞬间 */
            .fade-exit {
              opacity: 1;
            }
            /*出场到出场结束的过程 */
            .fade-exit-active {
              opacity: 0;
              transition: opacity 1s ease-in;
            }
            /*出场动画执行后保持状态 */
            .fade-exit-done {
              opacity: 0;
            }
          `}</style>
      </Layout>
    )
  }
}

export default Index