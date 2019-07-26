import styled, { keyframes } from 'styled-components'

export const CloseWrapperStyled = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`
export const ImageZoomableStyled = styled.div`
  position: relative;
  display: inline-block;
  cursor: zoom-in;
`

export const WrapperLoading = styled.div`
  background: #444444;
  width: ${({ inside }) => (inside ? '100%' : '100vw')};
  height: ${({ inside }) => (inside ? '100%' : '100vh')};
  position: ${({ inside }) => (inside ? 'absolute' : 'fixed')};
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  transition: opacity 350ms linear;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  height: 100%;
  display: flex;
  display: ${({ isFullScreen }) => (isFullScreen ? 'flex' : 'none')};
`

const backgroundAnimation = colors => keyframes`
  0%,100% {
    background-color: ${colors[0]}; 
  }
  25% {
    background-color: ${colors[1]}; 
  }
  50% {
    background-color: ${colors[2]}; 
  }
  75% {
    background-color: ${colors[3]}; 
  }
`

export const Round = styled.span`
  display: inline-block;
  border-radius: 50%;
  flex-shrink: 0;
  width: 2em;
  height: 2em;
  margin: 1em;
  animation: ${({ colors }) => backgroundAnimation(colors)} 1s linear 0s infinite;
`

export const WrapperZoomInStyled = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0.25em;
`

export const ImgageZoomIconStyled = styled.img`
  transition: transform 200ms ease;

  &:hover {
    transform: scale(1.3);
  }
`
