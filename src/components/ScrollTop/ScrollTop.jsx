import React, { useState, useEffect, useCallback } from 'react'
import scroll from '@assets/scroll.png'

import './ScrollTop.styl'

function ScrollTop () {
  const [show, setShow] = useState(false)

  const handleScroll = useCallback(
    () => {
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop > 400) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
  )

  const backTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
    return () => {
      window.removeEventListener('scroll', handleScroll, true)
    };
  }, [])

  return (
    <div className={`scroll ${show ? 'showStyle' : 'hiddenStyle'}`} onClick={backTop}>
      <img src={scroll} />
    </div>
  )
}

export default ScrollTop
