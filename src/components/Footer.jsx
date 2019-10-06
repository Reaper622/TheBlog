import React from 'react'
import {Layout, Row, Col, Icon} from 'antd'
import BeiAnIcon from '@assets/beian.png'

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
          ©Copyright 2019 Reaper622 | 豫ICP备 19033565 | <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41018202000704"> <img src={BeiAnIcon} /> 豫公网安备 41018202000704 号</a>
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