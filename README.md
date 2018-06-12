# Install
[![react-imagezoomable](https://nodei.co/npm/react-imagezoomable.png)](https://npmjs.org/package/react-imagezoomable)
```sh
    npm install react-imagezoomable --save
```
# Demo
You can find a good example on [stoneisland30](http://www.stoneisland30.com/en/extra/)
You can find simple example on [codesandbox](https://1j86yy833.codesandbox.io/)
# Usage

```sh
      <ImageZoomable
        uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6aet0wf5IR_eWqnfWt96RfCREgsO4LjjM6qQYnELMVw7uYM9_Ag"
        uriHD="http://www.telegraph.co.uk/content/dam/Travel/Tours/New%20York1-xlarge.jpg"
        debug
        // percBigger={10}
        // fadeInMillis={350}        
      />
```
- percBigger (optional) define zoom level. If set to 0 only x/y will move. Default il 10%
- fadeInMillis (optional) define time of fade. Default is 350
- Debug draw a red line which help you to understand if mouse arrive cerrectly in all 4 corners of the image
- uriHD and uri should be the same image but with different resolution
- 
# Warning
if you have installed this library version under 0.3.0, you have to specify hqWidth and hqHeight like this:
- hqWidth={1200} hdHeight={900}

# New Versions 0.3.0 
- now imageHd sizes are calculated at runtime, and user can use this library without know the source image -> FINALLY :)

# New Versions 0.2.1
- fix fadeInMillis props

# New Versions 0.2.0
- add percBigger and fadeInMillis props
- NOW WORK ALSO IN TOUCH SCREEN DEVICE


