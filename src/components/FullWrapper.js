import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { GetImageProps } from '../utils/algoritms'
import infoDevice from '../utils/infoDevice'

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0%;
  background: transparent;
  box-sizing: border-box;
`

export const FullWrapper = ({ imageAttr, options, notifyImgLoaded, imgLoaded }) => {
  const { debug, percBigger } = options
  const imgEl = useRef(null)
  const imageProps = useRef()
  const [translate, setTranslate] = useState({ translateX: 0, translateY: 0 })

  const setTranslatedPos = (percFromHalfScreenX, percFromHalfScreenY) => {
    setTranslate({
      translateX: (imageProps.current.newLeft * percFromHalfScreenX) / 100,
      translateY: -(imageProps.current.newTop * percFromHalfScreenY) / 100,
    })
  }

  const handleTouchMove = event => {
    const { halfScreenX, halfScreenY } = infoDevice.halfScreen()
    const touchobj = event.changedTouches[0]
    let percFromHalfScreenX = (-(halfScreenX - touchobj.clientX) / halfScreenX) * 100
    let percFromHalfScreenY = (-(halfScreenY - touchobj.clientY) / halfScreenY) * 100
    setTranslatedPos(percFromHalfScreenX, percFromHalfScreenY)
  }

  const handleMouseMove = event => {
    const { halfScreenX, halfScreenY } = infoDevice.halfScreen()
    event = event || window.event
    const percFromHalfScreenX = (-(halfScreenX - event.pageX) / halfScreenX) * 100
    const percFromHalfScreenY = (-(halfScreenY - event.pageY) / halfScreenY) * 100
    setTranslatedPos(percFromHalfScreenX, percFromHalfScreenY)
  }

  useEffect(() => {
    if (infoDevice.isTouchOnly()) {
      document.addEventListener('touchmove', handleTouchMove)
    } else {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const style = {
    top: imageProps && imageProps.current ? -imageProps.current.newTop : 'initial',
    left: imageProps && imageProps.current ? imageProps.current.newLeft : 'initial',
    width: imageProps && imageProps.current ? imageProps.current.newImgWidth : 'auto',
    height: imageProps && imageProps.current ? imageProps.current.newImgHeight : 'auto',
    transform: `translate(${translate.translateX}px,${translate.translateY}px)`,
    border: debug ? '10px solid red' : 'none',
    maxWidth: 'none',
    position: 'fixed',
    right: 0,
    willChange: 'transform',
    boxSizing: 'border-box',
    opacity: imgLoaded ? '1' : '0',
  }

  return (
    <Wrapper>
      <img
        style={style}
        ref={imgEl}
        {...imageAttr}
        onLoad={({ target }) => {
          const { naturalWidth, naturalHeight } = target
          imageProps.current = GetImageProps(
            window.innerWidth,
            window.innerHeight,
            naturalWidth,
            naturalHeight,
            percBigger
          )

          const f = () => {
            notifyImgLoaded(true)
          }
          setTimeout(f, 350)
        }}
      />
    </Wrapper>
  )
}
