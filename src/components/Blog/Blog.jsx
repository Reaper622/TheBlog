import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Icon, Button } from 'antd'
import MDRender from '../MarkdownRender/MarkdownRender'
import './blog.styl'
// 折叠Markdown部分的css
const flodMD = { height: 800, overflow: 'hidden', marginBottom: 20 }
// 展开markdown部分的css
const openMD = { height: 'auto', marginBottom: 20 }
const Blog = React.memo(function Blog ({ id, title, label, time, visit, content, isPriview = false }) {
  const [isFolded] = useState(isPriview)

  return (
    <div className="blog">
      <Row type="flex" justify="center">
        <Col span={12} className='title' style={{ fontSize: '20px', textAlign: 'center', fontWeight: 600 }}>{title}</Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span={6} style={{ textAlign: 'center', color: '#FF3F1A' }}><Icon type="tag" />{label}</Col>
        <Col span={6} style={{ textAlign: 'center', color: '#00A7E0' }}><Icon type="calendar" />时间:{time}</Col>
        <Col span={6} style={{ textAlign: 'center' }}><Icon type="user" />阅读人数:{visit}</Col>
      </Row>
      <Row>
        <Col span={24} style={isFolded ? flodMD : openMD}>
          <MDRender content={content} isBase64={false} />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        {isFolded
          ? <Col>
            <Link to={`/articles/${id}`}>
              <Button type="primary" size="default" >阅读全文<Icon type="right" /></Button>
            </Link>
          </Col>
          : null
        }
      </Row>
    </div>
  )
})

export default withRouter(Blog)
