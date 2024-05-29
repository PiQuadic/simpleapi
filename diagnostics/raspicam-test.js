const RaspiCam = required("raspicam");

const ops = {
  mode: "photo",
  output: "fileTest%d.jpg"
};

const camera = new RaspiCam({ops});


