import React, {useState, useEffect, useRef, useCallback} from 'react'
import './SideMenu.styl'
import { Link } from 'react-router-dom'
import BingGuoPic from '@assets/bingguo.webp'

function SideMenu ({hotArticles}) {
	const [affix, setAffix] = useState(false)
	const sidemenu = useRef(null)
	useEffect(() => {
		window.addEventListener('scroll', handleScroll, true)
		return () => {
			window.removeEventListener('scroll', handleScroll, true)
		}
	}, [])

	const handleScroll = useCallback(
    () => {
	  	let scrollTop = document.documentElement.scrollTop
      if (scrollTop > 600) {
        setAffix(true)
      } else {
        setAffix(false)
      }
    }
  )

  return (
    <div ref={sidemenu} className={ affix ? `side-menu affix` : `side-menu`}>
    	<img src={BingGuoPic} alt="冰菓"/>
			<ul>
				{hotArticles.map(blog => (
					<li key={blog.id}><Link className='title' to={`articles/${blog.id}`}>{blog.title}</Link><span>{blog.visit}次阅读</span></li>
				))}
			</ul>
    </div>
  )
}

export default SideMenu
