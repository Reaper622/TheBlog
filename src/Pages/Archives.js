import React, {Component} from 'react'
import TheHeader from '@components/Header'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {Layout, Row, Col} from 'antd'
import { connect } from 'react-redux'
import {loadBlogs} from '../redux/store'
import TheFooter from '@components/Footer'

const { Content } = Layout

const Article = (blog) => (
  <div style={{height: '40px', fontSize: '16px', lineHeight: '40px', margin: '5px 0'}}>
      <span>-</span>
      <Link to={`/articles/${blog.id}`} className="articleLink">
        <span style={{margin: '0 10px'}}>{blog.time}</span>
        <span>{blog.title}</span>
      </Link>

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


  componentDidMount() {
    this.getArchives()
  }

  getArchives() {
    Axios.get('http://127.0.0.1:4000/blog/getblogs')
      .then(res => {
        res.data.blogs.map(blog => {
          blog.time = blog.time.split('T')[0]
        })
        this.props.loadBlogs(res.data)
      })
  }


  render() {
    return (
      <Layout>
        <TheHeader  current={'archives'}></TheHeader>
        <Content>
          <Row>
            <Col offset={4}  span={12}  style={{background: '#fff', minHeight: '600px' , padding: '20px 0'}}>
              <Row>
                <Col offset={2}>
                  <span style={{height: '50px', fontSize: '20px', lineHeight: '50px'}}>目前共计 {this.props.blogs ? this.props.blogs.length : 0} 篇博客</span>
                  {this.props.blogs ? this.props.blogs.map(blog => <Article key={blog.id} {...blog} />) : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <TheFooter></TheFooter>
        <style jsx>{`
            .articleLink {
              color: #666;
              transition: all .25s linear;
            }
            .articleLink:hover {
              color: #1890FF;
            }
          `}</style>
      </Layout>
    )
  }
}

export default Archives