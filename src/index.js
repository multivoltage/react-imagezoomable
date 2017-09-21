import React, { Component } from 'react'


const fadeMillis = 400;
const percBigger = 10;
const zIndexPopup = 1500;

const imageZoomableStyle = {
  display: 'inline-block',
  position: 'relative'
}

export default class ImageZoomable extends Component {

  constructor(props){
    super(props);

    this.state = {
      fullScreen: false,
      translateX: 0,
      translateY: 0,
      hqLoaded: false,
      downloadingHq: false
    }

    this.handlerMouseMove = (halfScreenX,halfScreenY) => {

      if(!this.state.fullScreen)
        return false;
               
      event = event || window.event;

      // store where the mouse was at component mounted
      if(!this.landingX)
        this.landingX = event.pageX;
      
      if(!this.landingY)
        this.landingY = event.pageY;
         
      let percFromHalfScreenX = - (halfScreenX - event.pageX) / halfScreenX * 100;
      let percFromHalfScreenY = - (halfScreenY - event.pageY) / halfScreenY * 100;
      
      this.setState({
        translateX: this.newLeft * percFromHalfScreenX / 100,
        translateY: - (this.newTop * percFromHalfScreenY * 100 / 100) / 100 
      });      
    }
  }

  componentDidMount(){
    let halfScreenX = window.innerWidth / 2;
    let halfScreenY = window.innerHeight / 2;

    if('onmousemove' in document.documentElement)
      document.addEventListener('mousemove',this.handlerMouseMove.bind(this,halfScreenX,halfScreenY));  
    else 
      document.addEventListener('touchmove',this.handlerMouseMove.bind(this,halfScreenX,halfScreenY));
  }

  componentWillUnmount(){
    if('onmousemove' in document.documentElement)
      document.removeEventListener('mousemove',this.handlerMouseMove);
    else 
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
        transition: `opacity ${fadeMillis/1000}s ease-in-out`,
        zIndex: zIndexPopup,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      }

      return(
        <div style={imageZoomableStyle} className="image-zoomable">
          {this.renderNormal()}
          <div className="image-zoomable--fullscreen" style={fullScreenContainerStyle}>
            {this.renderFullScreen()}
          </div>
        </div>      
      );
    }
  }

  renderNormal(){

    const imgStyle = {
        opacity: this.state.hqLoaded ? '0' : '1',
        transition: `opacity ${fadeMillis/1000}s ease-in-out`,
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
    let imgRatio = parseInt(this.props.hqWidth) / parseInt(this.props.hqHeight);
    
    let newImgWidth, newImgHeight, unitIncrease;
    
    // rS > rI ? (iW*sW/iH,sH) : (sW,iH*sW/iW)
    if(screeRatio > imgRatio){

      newImgWidth = parseInt(this.props.hqWidth)*window.innerHeight/parseInt(this.props.hqHeight);
      newImgHeight = window.innerHeight;
      unitIncrease = window.innerWidth / newImgWidth;

    } else {

      newImgWidth = window.innerWidth;
      newImgHeight = parseInt(this.props.hqHeight)*window.innerWidth/parseInt(this.props.hqHeight);
      unitIncrease = window.innerHeight / newImgHeight;

    }
    
    newImgWidth = (newImgWidth * unitIncrease) * (100 + percBigger) / 100;
    newImgHeight = newImgHeight * unitIncrease * (100 + percBigger) / 100;

    debugger;
    
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

  toogleZoom(){
    let tapToExit = this.state.fullScreen;

    if(!this.state.fullScreen){
      this.setState({ 
        fullScreen: true,
        downloadingHq: true
      });
    } else {
      this.setState({ hqLoaded: false });
      setTimeout(()=>{ this.setState({ fullScreen: false }); },fadeMillis);
    }
  }
}




