import React, {Component} from 'react'
import TheHeader from '@components/Header'
import Blog from '@components/Blog'
import {Layout, Row, Col} from 'antd'
import { connect } from 'react-redux'
import {loadBlogs} from '../redux/store'

const { Content } = Layout

@connect(
  state => state,
)
class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blog : {}
    }
  }
  
  componentWillMount() {
    console.log(this.props)
    let blog = this.props.blogs.filter(item => item.id == this.props.match.params.id)[0]
    console.log(blog)
    this.setState({
      blog
    })
  }




  render() {
  return (
      <Layout>
        <TheHeader></TheHeader>
        <Content>
          <Row>
            <Col offset={4}  span={12} style={{}} >    
                <Blog {...this.state.blog} />
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Article