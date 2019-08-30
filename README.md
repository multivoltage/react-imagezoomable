# Install
[![react-imagezoomable](https://nodei.co/npm/react-imagezoomable.png)](https://npmjs.org/package/react-imagezoomable)
```sh
    npm install react-imagezoomable
```
# Demo
You can find a good example on [stoneisland30](http://www.stoneisland30.com/en/extra/)
You can find my storybook on https://multivoltage.github.io/react-imagezoomable/
# Usage

```jsx
    import { ImageZoomable } from 'react-imagezoomable'
    
    // options not required
    const options = {
      preloadHDtime: false,
      placeHolderInside: true,
      iconZoomInEnable: true,
      percBigger: 25,
    }
	const fullImgAttr  = {
		srcSet: `ball.jpg 320w, ballBig.jpg 480w`,
		sizes: `(max-width: 320px) 280px, (max-width: 480px) 440px, 800px`,
		src: `ball.jpg`,
		alt: `this is cool`,
		// you can put other attributes...
	}
    
    <ImageZoomable imageAttr={fullImgAttr}>
        <img src="ball.jpg" sizes="(max-width: 320px) 280px" src-set="ball.jpg 320w"/>
    </ImageZoomable>
```
# Options
```preloadHDtime``` ```default = 0``` 
It defines how much time in millisecond the component will wait before load a not visible version of full screen image. This can be useful is site host a large images (some megabytes), because probably when user click on the image, the full version is already loaded and user will not wait 10 second to download the image (thanks to cache)
[storybook-example](https://multivoltage.github.io/react-imagezoomable/?path=/story/imagezoomable--with-preloadhd-true)

```placeHolderInside``` ```default is false```
it defines if the colored loading will be inside the small image or cover the full screen window
[storybook-example](https://multivoltage.github.io/react-imagezoomable/?path=/story/imagezoomable--with-placeholder-inside-small-image)

```renderCustomPlaceholder``` ```undefined```
if this function is provided, the component will render a custom placeholder instead the original colored loading
[storybook-example](https://multivoltage.github.io/react-imagezoomable/?path=/story/imagezoomable--with-custom-placeholder-loading)

```iconZoomInEnable``` ```default is false```
it defines if at the top-right corner of small image a zoom-in icon will be draw
[storybook-example](https://multivoltage.github.io/react-imagezoomable/?path=/story/imagezoomable--with-zoom-in-icon-active)

```percBigger``` ```default is 10```
[storybook-example](https://multivoltage.github.io/react-imagezoomable/?path=/story/imagezoomable--with-0-zoom-effect)

```debug``` ```default = false```
if true you can see a red line in full screen image. This is useful for development

# New Version 1.0.0 (Breacking-changes)
- now ```<ImageZoomable>``` is only a wrapper around basic ```<img>``` tag
- user can use ```srcset``` and ```sizes``` both for small image and fullscreen image
- ```preloadHDtime``` prop introduced
- ```placeHolderInside``` prop introduced
- ```iconZoomInEnable``` prop introduces

# New Versions 0.3.0 
- now imageHd sizes are calculated at runtime, and user can use this library without know the source image -> FINALLY :)

# New Versions 0.2.1
- fix fadeInMillis props

# New Versions 0.2.0
- add percBigger and fadeInMillis props
- NOW WORK ALSO IN TOUCH SCREEN DEVICE

# Warning
if you have installed this library version under 0.3.0, you have to specify hqWidth and hqHeight like this:
- hqWidth={1200} hdHeight={900}


