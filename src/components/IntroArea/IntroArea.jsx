import React from 'react'

import {Row, Col} from 'antd'
import './IntroArea.styl'

const IntroArea = React.memo(({config}) => {
    return (
        <Row className="introArea" type="flex" justify="center" >
        <Col span={12}>
          <div className="intro">
            <Row type="flex" justify="center" style={{ paddingTop: '10px' }}>
              <Col span={4}>
                <img src={config.avatar_url} alt="头像" style={{ width: '100%', borderRadius: '50%' }} />
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={20} className="bio">
                {config.bio}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    )
})

export default IntroArea