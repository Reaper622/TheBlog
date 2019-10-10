import React, {useState, useEffect, useCallback} from 'react'
import scroll from '@assets/scroll.png'



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
            left:0,
            top:0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true)
        return () => {
            window,removeEventListener('scroll', handleScroll, true)
        };
    }, [])

    return (
        <div className={`scroll ${show ? 'showStyle': 'hiddenStyle' }`} onClick={backTop}>
            <img  src={scroll} />
            <style jsx>{`
                .scroll {
                    position: fixed;
                    z-index: 10000;
                    transition: top .5s linear;
                    cursor: pointer;
                    right: 200px;
                }
                .showStyle {
                    top: -300px;
                }
                .hiddenStyle {
                   top: -1060px;
                }
            `}</style>
        </div>
    )
}

export default ScrollTop