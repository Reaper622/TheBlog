import React from 'react'
import {Layout, Row, Col, Icon} from 'antd'

const {Footer} = Layout 


function TheFooter () {
  return (
    <Footer style={{background: '#232323', color: '#fff'}}>
      <Row type="flex" justify="center">
        <Col span={12} style={{textAlign: 'center'}}>
            托管于<a href="https://github.com/Reaper622/TheBlog">GitHub</a>, <a href="https://www.qiniu.com/">七牛云</a>提供CDN服务
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={12} style={{textAlign: 'center'}}>
          ©Copyright 2019 Reaper622 | 豫ICP备19033565
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={12} style={{textAlign: 'center'}}>
          Made with <Icon type="heart" theme="filled" style={{color: '#D43F57'}} />  by Reaper622
        </Col>
      </Row>
    </Footer>
  )
}

export default TheFooter