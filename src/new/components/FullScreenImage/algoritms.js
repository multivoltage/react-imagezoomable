export const GetImageProps = (
  windowInnerW,
  windowInnerH,
  naturalImgW,
  naturalImageH,
  percBigger = 0
) => {
  console.log('----------------------------------')
  console.log('input', windowInnerW, windowInnerH, naturalImgW, naturalImageH, percBigger)

  const screeRatio = windowInnerW / windowInnerH
  const imgRatio = naturalImgW / naturalImageH

  let newImgWidth,
    newImgHeight,
    unitIncrease = 1

  // rS > rI ? (iW*sW/iH,sH) : (sW,iH*sW/iW)
  if (screeRatio > imgRatio) {
    newImgWidth = (naturalImgW * windowInnerH) / naturalImageH
    newImgHeight = windowInnerH
    unitIncrease = windowInnerW / newImgWidth
  } else {
    newImgWidth = windowInnerW
    newImgHeight = (naturalImageH * windowInnerW) / naturalImgW
    unitIncrease = windowInnerH / newImgHeight
  }

  newImgWidth = (newImgWidth * unitIncrease * (100 + percBigger)) / 100
  newImgHeight = (newImgHeight * unitIncrease * (100 + percBigger)) / 100

  // for debug this ratio must be equals to initial imgRatio
  // let newRatio = newImgWidth / newImgHeight;

  const newLeft = -(newImgWidth - windowInnerW) / 2
  const newTop = (newImgHeight - windowInnerH) / 2

  console.log('output', newLeft, newTop, newImgWidth, newImgHeight)
  console.log('----------------------------------')
  return {
    newLeft,
    newTop,
    newImgWidth,
    newImgHeight,
  }
}
