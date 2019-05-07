import React, { useState } from 'react'
import styled from 'styled-components'

export const FullScreenWapper = ({
  fadeMillis = 2000,
  hqLoaded = false,
  zIndexPopup = 1500,
  handleFullContainerTransitionEnd,
  children,
}) => {
  return (
    <WrapperFullScreen
      onTransitionEnd={handleFullContainerTransitionEnd}
      hqLoaded={hqLoaded}
      fadeMillis={fadeMillis}
      zIndexPopup={zIndexPopup}
    >
      {children}
    </WrapperFullScreen>
  )
}

const WrapperFullScreen = styled.div`
  position: fixed;
  box-sizing: border-box;
  opacity: ${({ hqLoaded }) => (hqLoaded ? 1 : 0)};
  transition: ${({ fadeMillis }) => `opacity ${fadeMillis / 1000}s ease-in-out`};
  z-index: ${({ zIndexPopup }) => zIndexPopup};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  will-change: transform;
`
