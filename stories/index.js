import React from 'react'
import { storiesOf } from '@storybook/react'
import { ImageNormal } from '../src/new/components/ImageNormal/ImageNormal'
import ImageZoomable from '../src/index'

storiesOf('<ImageNormal>', module).add('basic behavior', () => (
  <ImageNormal
    uri={
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6aet0wf5IR_eWqnfWt96RfCREgsO4LjjM6qQYnELMVw7uYM9_Ag'
    }
  />
))

storiesOf('<ImageNormal>', module).add('base usase', () => (
  <ImageZoomable
    uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6aet0wf5IR_eWqnfWt96RfCREgsO4LjjM6qQYnELMVw7uYM9_Ag"
    uriHD="http://www.telegraph.co.uk/content/dam/Travel/Tours/New%20York1-xlarge.jpg"
    debug
    // percBigger={10}
    fadeInMillis={350}
  />
))
