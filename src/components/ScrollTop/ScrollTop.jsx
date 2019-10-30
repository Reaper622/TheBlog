import React, { useState, useEffect, useCallback, useRef } from 'react'
import scroll from '@assets/scroll.png'

import './ScrollTop.styl'

function ScrollTop () {
  const [show, setShow] = useState(false)
  const scrolling = useRef(false)
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
    // 添加函数节流
    window.addEventListener('scroll', function () {
			// 如果正在滚动 直接return
			if (scrolling.current) {
				return
			}
			scrolling.current = true
			
			setTimeout(() => {
				handleScroll()
				scrolling.current = false
			}, 300)
		}, true)
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
