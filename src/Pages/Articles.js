import React, {Component} from 'react'
import TheHeader from '@components/Header'
import TheFooter from '@components/Footer'
import Blog from '@components/Blog'
import {Layout, Row, Col} from 'antd'
import { connect } from 'react-redux'
import Axios from 'axios'

const { Content } = Layout

@connect(
  state => state,
)
class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentWillMount() {
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

  getSingleBlog(id) {
    Axios.get(`http://127.0.0.1:4000/blog/getsingleblog/${id}`)
      .then(res => {
        res.data.time = res.data.time.split('T')[0]
        this.setState({blog: res.data})
      })
  }

  plusvisit(id) {
    Axios.get(`http://127.0.0.1:4000/blog/plusvisit/${id}`)
  }




  render() {
  return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col offset={4}  span={12} >    
              {this.state.blog  ? <Blog {...this.state.blog} /> : 456 }  
            </Col>
          </Row>
        </Content>
        <TheFooter></TheFooter>
      </Layout>
    )
  }
}

export default Article