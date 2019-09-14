import React from 'react'
import {Row, Col} from 'antd'
import MDRender from './MarkdownRender'


function Blog({title, label, time, visit, content}) {
  return (
    <div className="root">
      <Row type="flex" justify="center">
        <Col span={12} style={{fontSize: '20px', textAlign: 'center', fontWeight: 600}}>{title}</Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span={6} style={{textAlign: 'center'}}>标签:{label}</Col>
        <Col span={6} style={{textAlign: 'center'}}>时间:{time.split('T')[0]}</Col>
        <Col span={6} style={{textAlign: 'center'}}>访问人数:{visit}</Col>
      </Row>
      <Row>
        <Col span={24}>
          <MDRender content={content} isBase64={false} />
        </Col>
      </Row>
      <style jsx>{`
          .root {
            background: #fff;
          }
        `}</style>
    </div>
  )
}

export default Blog