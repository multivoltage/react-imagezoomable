import React from 'react'
import styled from 'styled-components'

export const ImageNormal = ({ fadeMillis = 2000, hqLoaded = false, uri, toogleZoom }) => {
  return (
    <div>
      <MyImg src={uri} onClick={toogleZoom} hqLoaded={hqLoaded} fadeMillis={fadeMillis} />
    </div>
  )
}

export const MyImg = styled.img`
  opacity: ${({ hqLoaded }) => (hqLoaded ? 0 : 1)};
  transition: ${({ fadeMillis }) => `opacity ${fadeMillis / 1000}s ease-in-out`};
  max-width: 100%;
`
