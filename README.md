# Install
[![rc-table](https://nodei.co/npm/rc-table.png)](https://npmjs.org/package/rc-table)
```sh
    npm install react-imagezoomable --save
```
# Demo
You can find simple example on [codesandbox](https://1j86yy833.codesandbox.io/)
# Usage

```sh
      <ImageZoomable hqWidth="1200px" hqHeight="800px"
        uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6aet0wf5IR_eWqnfWt96RfCREgsO4LjjM6qQYnELMVw7uYM9_Ag"
        uriHD="http://www.telegraph.co.uk/content/dam/Travel/Tours/New%20York1-xlarge.jpg"
        debug
      />
```
- Debug draw a red line which help you to understand if mouse arrive cerrectly in all 4 corners of the image
- uriHD and uri should be the same image but with different resolution
- hqWidth and wqWidth give dimension of uriHD image.
- 
# ToDo
- remove hqWidth and wqWidth and calculate these values automatically
