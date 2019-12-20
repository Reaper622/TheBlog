import React, { PureComponent } from 'react'
import TheHeader from '@components/Header/Header'
import TheFooter from '@components/Footer/Footer'
import Blog from '@components/Blog/Blog'
import { Layout, Row, Col, Skeleton } from 'antd'
import { connect } from 'react-redux'
import Axios from 'axios'
import config from '../../../config.json'

import './Articles.styl'

const { Content } = Layout


const SkeletonBody = () => (
  <div className="skeleton-body">
    <Skeleton paragraph={{ rows: 12 }} title active />
  </div>
)

@connect(
  state => state
)
class Article extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    let id = this.props.match.params.id
    this.plusvisit(id)
    if (this.props.blogs) {
      let theBlog = this.props.blogs.filter(item => item.id == id)[0]
      this.setState({
        blog: theBlog
      })
    } else {
      this.getSingleBlog(id)
    }
  }

  getSingleBlog (id) {
    Axios.get(`${config.server_url}/blog/getsingleblog/${id}`)
      .then(res => {
        res.data.time = res.data.time.split('T')[0]
        this.setState({ blog: res.data })
      })
  }

  plusvisit (id) {
    Axios.get(`${config.server_url}/blog/plusvisit/${id}`)
  }

  render () {
    return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col xs={{ span: 24 }} xl={{ offset: 4, span: 16 }} xxl={{ offset: 4, span: 16 }}>
              {this.state.blog ? <Blog {...this.state.blog} /> :  <SkeletonBody /> }
            </Col>
          </Row>
        </Content>
        <TheFooter></TheFooter>
      </Layout>
    )
  }
}

export default Article
