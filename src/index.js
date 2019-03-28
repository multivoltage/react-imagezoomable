import React, { Component, useState, useEffect } from 'react'
import infoDevice from './infoDevice.js'

const STANDARD_FADE_MILLIS = 350;
const STANDARD_PERC_BIGGER = 10;
const zIndexPopup = 1500;

const imageZoomableStyle = {
  display: 'inline-block',
  position: 'relative'
}

const NormalImage = ({ hqLoaded, fadeInMillis, uri, toogleZoom }) => {
  const imgStyle = {
    opacity: hqLoaded ? '0' : '1',
    transition: `opacity ${fadeInMillis / 1000}s ease-in-out`,
    maxWidth: '100%'
  }
  return (
    <div className="image-zoomable--normal">
      <img src={this.props.uri} style={imgStyle} onClick={toogleZoom.bind(this)} />
    </div>
  );
}

const ImageZoomable2 = (props) => {

  const fadeMillis = props.fadeInMillis || STANDARD_FADE_MILLIS
  const percBigger = (props.percBigger === null || props.percBigger === undefined) ? STANDARD_PERC_BIGGER : props.percBigger

  let [fullScreen, setFullScreen] = useState(false)
  let [translateX, setTranslateX] = useState(0)
  let [translateY, setTranslateY] = useState(0)
  let [hqLoaded, setHqLoaded] = useState(false)
  let [downloadingHq, setDownloadingHq] = useState(false)
  let [naturalDimension, setNaturalDimension] = useState(null)
  //
  useEffect(() => {
    let halfScreenX = window.innerWidth / 2;
    let halfScreenY = window.innerHeight / 2;

    infoDevice.init();
    if (infoDevice.isTouchOnly()) {
      document.addEventListener('touchmove', handleTouchMove.bind(this, halfScreenX, halfScreenY));
    } else {
      document.addEventListener('mousemove', handleMouseMove.bind(this, halfScreenX, halfScreenY));
    }

    return () => {
      if ('touchmove' in document.documentElement)
        document.removeEventListener('touchmove', handleTouchMove);
      if ('mousemove' in document.documentElement)
        document.removeEventListener('touchmove', handleMouseMove);
    }
  }, [])
  //
  let newLeft = null

  const setTranslatedPos = (percFromHalfScreenX, percFromHalfScreenY) => {
    setTranslateX(newLeft * percFromHalfScreenX / 100)
    setTranslateY(- (this.newTop * percFromHalfScreenY) / 100)
  }

  const handleMouseMove = (halfScreenX, halfScreenY, event) => {
    if (!fullScreen)
      return false;

    event = event || window.event;

    let percFromHalfScreenX = - (halfScreenX - event.pageX) / halfScreenX * 100;
    let percFromHalfScreenY = - (halfScreenY - event.pageY) / halfScreenY * 100;

    setTranslatedPos(percFromHalfScreenX, percFromHalfScreenY);
  }

  const handleTouchMove = (halfScreenX, halfScreenY, event) => {
    if (!fullScreen)
      return false;

    let touchobj = event.changedTouches[0];

    let percFromHalfScreenX = - (halfScreenX - touchobj.clientX) / halfScreenX * 100;
    let percFromHalfScreenY = - (halfScreenY - touchobj.clientY) / halfScreenY * 100;

    setTranslatedPos(percFromHalfScreenX, percFromHalfScreenY);
  }

  const handleImageLoaded = () => {

    let naturalDimension = null
    if (this.refs.imgFullScreen) {
      naturalDimension = {
        n_width: this.refs.imgFullScreen.naturalWidth,
        n_height: this.refs.imgFullScreen.naturalHeight
      }
    }

    setHqLoaded(true)
    setDownloadingHq(false)
    setNaturalDimension(naturalDimension)
  }

  const handleFullContainerTransitionEnd = {
    if(!this.state.hqLoaded)
      this.setState({ fullScreen: false });
  }

  // normal state (like lansing for example)
  if (!fullScreen) {
    return (
      <div style={imageZoomableStyle} className="image-zoomable">
        <NormalImage hqLoaded={} />
      </div>
    )
  }
}

export default ImageZoomable2
