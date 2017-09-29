import React, { Component } from 'react'
import infoDevice from './infoDevice.js'

const STANDARD_FADE_MILLIS = 350;
const STANDARD_PERC_BIGGER = 10;
const zIndexPopup = 1500;

const imageZoomableStyle = {
  display: 'inline-block',
  position: 'relative'
}

export default class ImageZoomable extends Component {

  constructor(props){
    super(props);

    this.fadeMillis = this.props.fadeMillis || STANDARD_FADE_MILLIS;
    this.percBigger = (this.props.percBigger === null || this.props.percBigger === undefined) ? STANDARD_PERC_BIGGER : this.props.percBigger;

    this.state = {
      fullScreen: false,
      translateX: 0,
      translateY: 0,
      hqLoaded: false,
      downloadingHq: false
    }
  }

  handleMouseMove(halfScreenX,halfScreenY,event){
      if(!this.state.fullScreen)
        return false;
               
      event = event || window.event;
             
      let percFromHalfScreenX = - (halfScreenX - event.pageX) / halfScreenX * 100;
      let percFromHalfScreenY = - (halfScreenY - event.pageY) / halfScreenY * 100;

      this.setTranslatedPos(percFromHalfScreenX,percFromHalfScreenY);
  }

  handleTouchMove(halfScreenX,halfScreenY,event){
      if(!this.state.fullScreen)
        return false;

      let touchobj = event.changedTouches[0];

      let percFromHalfScreenX = - (halfScreenX - touchobj.clientX) / halfScreenX * 100;
      let percFromHalfScreenY = - (halfScreenY - touchobj.clientY) / halfScreenY * 100;
    
      this.setTranslatedPos(percFromHalfScreenX,percFromHalfScreenY);  
  }

  setTranslatedPos(percFromHalfScreenX, percFromHalfScreenY){
      this.setState({
        translateX: this.newLeft * percFromHalfScreenX / 100,
        translateY: - (this.newTop * percFromHalfScreenY) / 100
      });  
  }

  componentDidMount(){
    let halfScreenX = window.innerWidth / 2;
    let halfScreenY = window.innerHeight / 2;

    infoDevice.init();
    if(infoDevice.isTouchOnly()){
      document.addEventListener('touchmove',this.handleTouchMove.bind(this,halfScreenX,halfScreenY));  
    } else {
      document.addEventListener('mousemove',this.handleMouseMove.bind(this,halfScreenX,halfScreenY));  
    }
  }

  componentWillUnmount(){
    if('touchmove' in document.documentElement)
      document.removeEventListener('touchmove',this.handlerMouseMove);
    if('mousemove' in document.documentElement) 
      document.removeEventListener('touchmove',this.handlerMouseMove);
  }
  
  render(){

    if(!this.state.fullScreen){

      return(
        <div style={imageZoomableStyle} className="image-zoomable">
          {this.renderNormal()}
        </div>
      );

    } else {

      const fullScreenContainerStyle = {
        position: 'fixed',
        boxSizing: 'border-box',        
        opacity: this.state.hqLoaded ? '1' : '0',
        transition: `opacity ${this.fadeMillis/1000}s ease-in-out`,
        zIndex: zIndexPopup,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      }

      return(
        <div style={imageZoomableStyle} className="image-zoomable">
          {this.renderNormal()}
          <div className="image-zoomable--fullscreen" style={fullScreenContainerStyle}
            onTransitionEnd={this.handleFullContainerTransitionEnd.bind(this)}>
            {this.renderFullScreen()}
          </div>
        </div>      
      );
    }
  }

  renderNormal(){

    const imgStyle = {
        opacity: this.state.hqLoaded ? '0' : '1',
        transition: `opacity ${this.fadeMillis/1000}s ease-in-out`,
        maxWidth: '100%'
    }
    return (
      <div className="image-zoomable--normal">
        <img src={this.props.uri} style={imgStyle} onClick={this.toogleZoom.bind(this)}/>
      </div>
    );
  }

  renderFullScreen(){

    let screeRatio = window.innerWidth / window.innerHeight;
    let imgRatio = this.props.hqWidth / this.props.hqHeight;
    
    let newImgWidth, newImgHeight, unitIncrease;
    
    // rS > rI ? (iW*sW/iH,sH) : (sW,iH*sW/iW)
    if(screeRatio > imgRatio){

      newImgWidth = this.props.hqWidth * window.innerHeight/this.props.hqHeight;
      newImgHeight = window.innerHeight;
      unitIncrease = window.innerWidth / newImgWidth;

    } else {

      newImgWidth = window.innerWidth;
      newImgHeight = this.props.hqHeight * window.innerWidth/ this.props.hqHeight;
      unitIncrease = window.innerHeight / newImgHeight;

    }
    
    newImgWidth = (newImgWidth * unitIncrease) * (100 + this.percBigger) / 100;
    newImgHeight = newImgHeight * unitIncrease * (100 + this.percBigger) / 100;

    // for debug this ratio must be equals to initial imgRatio 
    // let newRatio = newImgWidth / newImgHeight;
    
    let newLeft = - (newImgWidth - window.innerWidth) / 2;
    let newTop =  (newImgHeight - window.innerHeight) / 2;  

    if(!this.newLeft){
      this.newLeft = newLeft;
    }
    if(!this.newTop){
      this.newTop = newTop;
    }
    
    let imgStyle = {
      top: - newTop,
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
      boxSizing: 'border-box'
    }

    return (
        <img onClick={this.toogleZoom.bind(this)} ref="imgFullScreen" style={imgStyle} src={this.props.uriHD} onLoad={this.handleImageLoaded.bind(this)} />
    );

  }

  handleImageLoaded(){
    this.setState({ hqLoaded: true, downloadingHq: false });
  }

  handleFullContainerTransitionEnd(){
    if(!this.state.hqLoaded)
      this.setState({ fullScreen: false });
  }

  toogleZoom(){
    let tapToExit = this.state.fullScreen;

    if(!this.state.fullScreen){
      this.setState({ 
        fullScreen: true,
        downloadingHq: true
      });
    } else {
      this.setState({ hqLoaded: false });
    }
  }
}




