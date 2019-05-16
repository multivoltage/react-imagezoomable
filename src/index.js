import React, { Component } from 'react'
import styled from 'styled-components'
import infoDevice from './infoDevice.js'
import { ImageNormal } from '../src/new/components/ImageNormal/ImageNormal'
import { GetImageProps } from '../src/new/components/FullScreenImage/algoritms'

const FullScreenWapper = React.lazy(() =>
  import(
    /* webpackChunkName: 'FullScreenWapper' */ '../src/new/components/FullScreenWapper/FullScreenWapper'
  )
)

const STANDARD_FADE_MILLIS = 350
const STANDARD_PERC_BIGGER = 10
const zIndexPopup = 1500

export default class ImageZoomable extends Component {
  constructor(props) {
    super(props)

    this.fadeMillis = this.props.fadeInMillis || STANDARD_FADE_MILLIS
    this.percBigger =
      this.props.percBigger === null || this.props.percBigger === undefined
        ? STANDARD_PERC_BIGGER
        : this.props.percBigger

    this.state = {
      fullScreen: false,
      translateX: 0,
      translateY: 0,
      hqLoaded: false,
      downloadingHq: false,
      naturalDimension: null,
    }

    this.imgFullScreen = React.createRef()
  }

  handleMouseMove(halfScreenX, halfScreenY, event) {
    if (!this.state.fullScreen) return false

    event = event || window.event

    let percFromHalfScreenX = (-(halfScreenX - event.pageX) / halfScreenX) * 100
    let percFromHalfScreenY = (-(halfScreenY - event.pageY) / halfScreenY) * 100

    this.setTranslatedPos(percFromHalfScreenX, percFromHalfScreenY)
  }

  handleTouchMove(halfScreenX, halfScreenY, event) {
    if (!this.state.fullScreen) return false

    let touchobj = event.changedTouches[0]

    let percFromHalfScreenX = (-(halfScreenX - touchobj.clientX) / halfScreenX) * 100
    let percFromHalfScreenY = (-(halfScreenY - touchobj.clientY) / halfScreenY) * 100

    this.setTranslatedPos(percFromHalfScreenX, percFromHalfScreenY)
  }

  setTranslatedPos(percFromHalfScreenX, percFromHalfScreenY) {
    this.setState({
      translateX: (this.newLeft * percFromHalfScreenX) / 100,
      translateY: -(this.newTop * percFromHalfScreenY) / 100,
    })
  }

  componentDidMount() {
    let halfScreenX = window.innerWidth / 2
    let halfScreenY = window.innerHeight / 2

    infoDevice.init()
    if (infoDevice.isTouchOnly()) {
      document.addEventListener(
        'touchmove',
        this.handleTouchMove.bind(this, halfScreenX, halfScreenY)
      )
    } else {
      document.addEventListener(
        'mousemove',
        this.handleMouseMove.bind(this, halfScreenX, halfScreenY)
      )
    }
  }

  componentWillUnmount() {
    if ('touchmove' in document.documentElement)
      document.removeEventListener('touchmove', this.handlerMouseMove)
    if ('mousemove' in document.documentElement)
      document.removeEventListener('touchmove', this.handlerMouseMove)
  }

  render() {
    if (!this.state.fullScreen)
      return (
        <>
          {/* we load also uriHd when react end loading */}
          <img src={this.props.uriHD} hidden={true} />
          {this.renderNormal()}
        </>
      )

    return (
      <div>
        {this.renderNormal()}
        <React.Suspense fallback={<div>Loading...</div>}>
          <FullScreenWapper
            fadeMillis={this.fadeMillis}
            hqLoaded={this.state.hqLoaded}
            zIndexPopup={zIndexPopup}
            handleFullContainerTransitionEnd={this.handleFullContainerTransitionEnd.bind(this)}
          >
            {this.renderFullScreen()}
          </FullScreenWapper>
        </React.Suspense>
      </div>
    )
  }

  renderNormal = () => {
    return (
      <ImageNormal
        fadeMillis={this.fadeMillis}
        hqLoaded={this.state.hqLoaded}
        uri={this.props.uri}
        toogleZoom={this.toogleZoom.bind(this)}
      />
    )
  }

  renderFullScreen = () => {
    if (!this.state.naturalDimension) {
      return (
        <img
          onClick={this.toogleZoom.bind(this)}
          ref={this.imgFullScreen}
          src={this.props.uriHD}
          onLoad={this.handleImageLoaded.bind(this)}
        />
      )
    }

    const { newLeft, newTop, newImgWidth, newImgHeight } = GetImageProps(
      window.innerWidth,
      window.innerHeight,
      this.state.naturalDimension.n_width,
      this.state.naturalDimension.n_height,
      this.percBigger
    )

    if (!this.newLeft) {
      this.newLeft = newLeft
    }
    if (!this.newTop) {
      this.newTop = newTop
    }

    let imgStyle = {
      top: -newTop,
      left: newLeft,
      width: newImgWidth,
      height: newImgHeight,
      transform: `translate(${this.state.translateX}px,${this.state.translateY}px)`,
      border: this.props.debug ? '10px solid red' : 'none',
      maxWidth: 'none',
      position: 'absolute',
      right: 0,
      zIndex: zIndexPopup,
      willChange: 'transform',
      boxSizing: 'border-box',
    }

    return (
      <img
        onClick={this.toogleZoom.bind(this)}
        ref="imgFullScreen"
        style={imgStyle}
        src={this.props.uriHD}
        onLoad={this.handleImageLoaded.bind(this)}
      />
    )
  }

  handleImageLoaded = () => {
    var naturalDimension = null

    // probably is alread defined when this method is called
    if (this.imgFullScreen.current) {
      naturalDimension = {
        n_width: this.imgFullScreen.current.naturalWidth,
        n_height: this.imgFullScreen.current.naturalHeight,
      }
    }

    this.setState({
      hqLoaded: true,
      downloadingHq: false,
      naturalDimension: naturalDimension || null,
    })
  }

  handleFullContainerTransitionEnd() {
    if (!this.state.hqLoaded) this.setState({ fullScreen: false })
  }

  toogleZoom() {
    if (!this.state.fullScreen) {
      this.setState({
        fullScreen: true,
        downloadingHq: true,
      })
    } else {
      this.setState({ hqLoaded: false })
    }
  }
}
