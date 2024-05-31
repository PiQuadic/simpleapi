const libcamera = require('node-libcamera')

// basic example
/*
libcamera.still({ output: 'test.jpg' })
  .then((result) => {console.log(result)})
  .catch((error) => {console.log(error)})
*/

// example with options
libcamera.still({
  output: 'images/test.jpg', // output file path
  timeout: 2000, // timeout before taking the picture
  width: 640, // image width
  height: 480, // image height
})
  .then((result) => {console.log(result)})
  .catch((error) => {console.log(error)})
