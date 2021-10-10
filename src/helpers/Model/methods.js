export const enableCam = (video,predictWebcam) => {
  const constraints = {
    video: {
      facingMode: "user",
    },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log("camara habilitada");
      video.srcObject = stream;
      video.addEventListener("loadeddata", predictWebcam);
    })
    .catch((error) => {
      console.log("error para habilitar la camara");
    });
};



export const getUserMediaSupported = () => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

export const handleEnableCamera = (video,predictWebcam) => {
  if (getUserMediaSupported()) {
    enableCam(video,predictWebcam);
  } else {
    console.warn("getUserMedia() is not supported by your browser");
  }
};

export const trimCanvas = (c) => {
  let ctx = c.getContext("2d"),
    copy = document.createElement("canvas").getContext("2d"),
    pixels = ctx.getImageData(0, 0, c.width, c.height),
    l = pixels.data.length,
    i,
    bound = {
      top: null,
      left: null,
      right: null,
      bottom: null,
    },
    x,
    y;

  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
  const cont = 5;
  let aux = 0;
  for (i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      // console.log('pixel', pixels.data[i + 3]);

      x = (i / 4) % c.width;
      y = ~~(i / 4 / c.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  // Calculate the height and width of the content

  let trimHeight = bound.bottom - bound.top,
    trimWidth = bound.right - bound.left,
    trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  // Return trimmed canvas
  return copy.canvas;
};

export const YouTubeGetID=(url)=>{
  var ID = '';
 
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;

}

export const getMean = (array) =>{
  var total = 0;
  var count = 0;
  for(let i=0;i<array.length;i++){
    total+=array[i]
    count++
  }
return total/count
}

export const getSTD = (array, mean)=>{
  array = array.map((k)=>{
    return (k - mean) ** 2
  })
  let sum = array.reduce((acc, curr)=> acc + curr, 0);
  
 // Calculating the variance
 let variance = sum / array.length
  
 // Returning the Standered deviation
 return Math.sqrt(sum / array.length)

}

export const getStandarizedArray = (array,mean,std) =>{
  for(let i=0;i<array.length;i++){
    array[i]=(array[i]-mean)/std
  }
  return array
}