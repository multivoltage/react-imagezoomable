# Install
```sh
    npm install react-imagezoomable --save
    
```
# Usage

```sh
    <ImageZoomable hqWidth="1350px" hqHeight="1150px"
      uri="http://www.stoneisland30.com/media/extras/LQ/stone-island-extra_03.jpg"
      uriHD="http://via.placeholder.com/1350x1150"
      debug 
      />
```
- Debug draw a red line which help you to understand if mouse arrive cerrectly in all 4 corners of the image
- uriHD and uri should be the same image but with different resolution
- hqWidth and wqWidth help component to calculate the right ratio of uriHD image.
- 
# ToDo
- remove hqWidth and wqWidth and calculate these values automatically
