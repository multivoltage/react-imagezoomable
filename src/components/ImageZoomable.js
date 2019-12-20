import React, { useState, useEffect } from 'react'
import { FullWrapper } from './FullWrapper'
import { ImageZoomableStyled, WrapperZoomInStyled, ImgageZoomIconStyled } from './generic.styled'
import { PlaceholderLoading } from './PlaceholderLoading'
import zoomInIconBlack from './zoomInB.svg'

export const IS_SMALL = 'IS_SMALL'
export const IS_BIG = 'IS_BIG'
export const OPENING_TRANSITION = 'OPENING_TRANSITION'
export const CLOSING_TRANSITION = 'CLOSING_TRANSITION'

const baseOptions = {
  preloadHDtime: 0,
  percBigger: 10,
  debug: false,
  placeHolderInside: false,
  iconZoomInEnable: false,
}
const getOptions = options => {
  return {
    ...baseOptions,
    ...options,
  }
}

export const ImageZoomable = ({ className, children, imageAttr, options }) => {
  const finalOptions = getOptions(options)
  const [state, setState] = useState(IS_SMALL)
  const [full, setFull] = useState(false)
  const [canPreloadHd, setCanPreloadHd] = useState(false)

  useEffect(() => {
    if (finalOptions.preloadHDtime === 0) return
    setTimeout(() => setCanPreloadHd(true), finalOptions.preloadHDtime)
  })

  const toogle = () => {
    if (state === IS_SMALL) {
      setFull(true)
      setTimeout(() => setState(OPENING_TRANSITION), 60)
    } else {
      setState(CLOSING_TRANSITION)
      setTimeout(() => {
        setState(IS_SMALL)
        setFull(false)
      }, 350)
    }
  }

  const notifyImgLoaded = loaded => {
    setState(IS_BIG)
  }

  return (
    <ImageZoomableStyled className={className} onClick={toogle}>
      {children}

      {/* this download images with lazy */}
      {canPreloadHd && <img {...imageAttr} hidden />}

      {(state === OPENING_TRANSITION || state === IS_BIG) && (
        <FullWrapper
          options={finalOptions}
          notifyImgLoaded={notifyImgLoaded}
          imageAttr={imageAttr}
          imgLoaded={state === IS_BIG}
        />
      )}

      <PlaceholderLoading
        isFullScreen={full}
        visible={state === OPENING_TRANSITION}
        inside={finalOptions.placeHolderInside}
        renderCustomPlaceholder={finalOptions.renderCustomPlaceholder}
      />

      {finalOptions.iconZoomInEnable && (
        <WrapperZoomInStyled>
          {state === IS_SMALL && (
            <ImgageZoomIconStyled src={zoomInIconBlack} alt="open full screen image" />
          )}
        </WrapperZoomInStyled>
      )}
    </ImageZoomableStyled>
  )
}
