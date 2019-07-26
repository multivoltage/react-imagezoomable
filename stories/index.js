import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { ImageZoomable, Round } from '../src'

const normalImgAttr = {
  srcSet: `https://via.placeholder.com/150 850w`,
  src: `https://via.placeholder.com/150`,
  alt: `this is cool`,
}

const imageBig = `https://upload.wikimedia.org/wikipedia/commons/f/f4/Miami_Beach_-_South_Beach_Monuments_-_Holocaust_Memorial_20.jpg`

const fullImgAttr = {
  srcSet: `${imageBig} 320w, ${imageBig} 480w`,
  sizes: `(max-width: 320px) 280px, (max-width: 480px) 440px, 800px`,
  src: `${imageBig}`,
  alt: `this is cool`,
}

storiesOf('<ImageZoomable>', module)
  .addParameters({ options: { showPanel: false } })
  .add('with basic setup', () => {
    return (
      <div>
        <ImageZoomable className="my-prefix" imageAttr={fullImgAttr}>
          <img {...normalImgAttr} />
        </ImageZoomable>
        <p>Without options passed</p>
      </div>
    )
  })
  .add('with custom placeholder loading', () => {
    const options = {
      debug: true,
      renderCustomPlaceholder: () => (
        <div>
          <h1>CUSTOM LOADING...</h1>
        </div>
      ),
    }

    return (
      <div>
        <ImageZoomable className="my-prefix" imageAttr={fullImgAttr} options={options}>
          <img {...normalImgAttr} />
        </ImageZoomable>
        <p>passing renderCustomPlaceholder props</p>
      </div>
    )
  })
  .add('with placeholder inside small image', () => {
    const options = {
      debug: true,
      placeHolderInside: true,
    }

    const Styled = styled(ImageZoomable)`
      ${Round} {
        height: 0.6em;
        width: 0.6em;
        margin: 8px;
      }
    `

    return (
      <div>
        <Styled className="my-prefix" imageAttr={fullImgAttr} options={options}>
          <img {...normalImgAttr} />
        </Styled>
        <p>With Placeholder loading inside small image</p>
      </div>
    )
  })
  .add('with zoom-in icon active', () => {
    const options = {
      debug: true,
      iconZoomInEnable: true,
    }

    return (
      <div>
        <ImageZoomable className="my-prefix" imageAttr={fullImgAttr} options={options}>
          <img {...normalImgAttr} />
        </ImageZoomable>
        <p>with an icon for zoom visible in small image</p>
      </div>
    )
  })
  .add('with 0% zoom effect', () => {
    const options = {
      debug: true,
      percBigger: 0,
    }

    return (
      <div>
        <ImageZoomable imageAttr={fullImgAttr} options={options}>
          <img {...normalImgAttr} />
        </ImageZoomable>
        <p>with a percentuage of zoom = 0 (only x or y axis will move</p>
      </div>
    )
  })
  .add('with preloadHd = true', () => {
    const options = {
      preloadHDtime: 3 * 1000,
    }

    return (
      <div>
        <ImageZoomable imageAttr={fullImgAttr} options={options}>
          <img {...normalImgAttr} />
        </ImageZoomable>
        <p>
          with preloadHDtime > 0 (3s in this case) hd version will be download after 3 secondo at
          mounted. This allows a render full screen very faster component
        </p>
      </div>
    )
  })
