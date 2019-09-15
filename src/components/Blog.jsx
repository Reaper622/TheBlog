import React, {useState} from 'react'
import {Row, Col, Icon, Button, AutoComplete} from 'antd'
import MDRender from './MarkdownRender'
// 折叠Markdown部分的css
const flodMD = {height: 800, overflow: 'hidden',marginBottom: 20}
// 展开markdown部分的css
const openMD = {height: 'auto', marginBottom: 20}
function Blog({title, label, time, visit, content}, isPriview) {

  const [isFolded, setIsFoded] = useState(isPriview)

  return (
    <div className="root">
      <Row type="flex" justify="center">
        <Col span={12} style={{fontSize: '20px', textAlign: 'center', fontWeight: 600}}>{title}</Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span={6} style={{textAlign: 'center', color: '#FF3F1A'}}><Icon type="tag" />:{label}</Col>
        <Col span={6} style={{textAlign: 'center', color: '#00A7E0'}}><Icon type="calendar" />时间:{time.split('T')[0]}</Col>
        <Col span={6} style={{textAlign: 'center'}}><Icon type="user" />阅读人数:{visit}</Col>
      </Row>
      <Row>
        <Col span={24} style={isFolded ? flodMD : openMD}>
          <MDRender content={content} isBase64={false}  />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        {isFolded ? 
        <Col span={2}>
          <Button type="primary" size="default" onClick={() => setIsFoded(false)}><Icon type="down" />阅读全文</Button>
        </Col> 
        :
        null
      }
        
      </Row>
      <style jsx>{`
          .root {
            background: #fff;
            padding: 50px 20px;
            margin: 50px 0;
            border-radius: 10px;
          }
        `}</style>
    </div>
  )
}

export default Blog