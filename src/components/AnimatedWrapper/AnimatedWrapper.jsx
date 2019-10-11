import React, {Component} from 'react'
import {CSSTransition} from 'react-transition-group'
import 'animate.css/animate.min.css'

const AnimatedWrapper = WrappedComponent => class AnimatedWrapper extends Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <CSSTransition
        in={true}
        classNames={'fade'}
        timeout={1000}
        mountOnEnter={true}
        unmountOnExit={true}>
          <WrappedComponent {...this.props} />
      </CSSTransition>
    )
  }
}

export default AnimatedWrapper