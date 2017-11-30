# Install
[![react-imagezoomable](https://nodei.co/npm/react-imagezoomable.png)](https://npmjs.org/package/react-imagezoomable)
```sh
    npm install react-imagezoomable --save
```
# Demo
You can find simple example on [codesandbox](https://1j86yy833.codesandbox.io/)
# Usage

```sh
      <ImageZoomable hqWidth={1200} hqHeight={800}
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
- hqWidth and wqWidth give dimension of uriHD image.
- 
# ToDo
- remove hqWidth and wqWidth and calculate these values automatically

# New Versions 0.2.0
- add percBigger and fadeInMillis props
- NOW WORK ALSO IN TOUCH SCREEN DEVICE

# New Versions 0.2.1
- fix fadeInMillis props
