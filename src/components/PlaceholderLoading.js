import React from 'react'
import { WrapperLoading, Round } from './generic.styled'

const red500 = '#f44336'
const indigo500 = '#3f51b5'
const teal500 = '#009688'
const yellow500 = '#ffeb3b'

const renderBalls = () => (
  <>
    <Round colors={[red500, indigo500, teal500, yellow500]} />
    <Round colors={[indigo500, teal500, yellow500, red500]} />
    <Round colors={[teal500, yellow500, red500, indigo500]} />
    <Round colors={[yellow500, red500, indigo500, teal500]} />
  </>
)
export const PlaceholderLoading = ({ isFullScreen, visible, inside, renderCustomPlaceholder }) => {
  return (
    <WrapperLoading isFullScreen={isFullScreen} visible={visible} inside={inside}>
      {renderCustomPlaceholder ? renderCustomPlaceholder() : renderBalls()}
    </WrapperLoading>
  )
}
