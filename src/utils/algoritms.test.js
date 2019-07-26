import { GetImageProps } from './algoritms'

test('614x667 screen, 1280x800 img, 10% bigger', () => {
  const windowW = 614,
    windowH = 667,
    imgW = 1280,
    imgH = 800

  const { newLeft, newTop, newImgWidth, newImgHeight } = GetImageProps(
    windowW,
    windowH,
    imgW,
    imgH,
    10
  )

  let value, expected

  value = Number(newLeft).toFixed(2)
  expected = Number(-279.96).toFixed(2)
  expect(value).toBe(expected)

  value = Number(newTop).toFixed(2)
  expected = Number(33.35).toFixed(2)
  expect(value).toBe(expected)

  value = Number(newImgWidth).toFixed(2)
  expected = Number(1173.92).toFixed(2)
  expect(value).toBe(expected)

  value = Number(newImgHeight).toFixed(2)
  expected = Number(733.7).toFixed(2)
  expect(value).toBe(expected)
})

test('614x667 screen, 0x0 img, 10% bigger', () => {
  const windowW = 614,
    windowH = 667,
    imgW = 0,
    imgH = 0

  const { newLeft, newTop, newImgWidth, newImgHeight } = GetImageProps(
    windowW,
    windowH,
    imgW,
    imgH,
    10
  )

  let value, expected

  value = Number(newLeft).toFixed(2)
  expected = Number(-279.96).toFixed(2)
  expect(value).toBe(expected)

  value = Number(newTop).toFixed(2)
  expected = Number(33.35).toFixed(2)
  expect(value).toBe(expected)

  value = Number(newImgWidth).toFixed(2)
  expected = Number(1173.92).toFixed(2)
  expect(value).toBe(expected)

  value = Number(newImgHeight).toFixed(2)
  expected = Number(733.7).toFixed(2)
  expect(value).toBe(expected)
})
