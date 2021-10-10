import * as tf from "@tensorflow/tfjs-core";
import * as tf_2 from "@tensorflow/tfjs";
import { getMean,getSTD,getStandarizedArray} from './Model/methods'

export const getEmbedding = async(img, model, model2,i) => {

  let canvas = document.getElementById(`output-upload${i}`);
  let ctx = canvas.getContext("2d");

  const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
  const flipHorizontal = true;
  const annotateBoxes = true;

console.log('kik;',canvas
.getContext("2d")
.getImageData(0, 0, canvas.width, canvas.height))
const embedding= await model
    .estimateFaces(canvas, returnTensors, flipHorizontal, annotateBoxes)
    .then((predictions) => {
    let array=[]
      if (predictions.length > 0) {

        console.log('blazeface is', model);

        array=predictions.map((face_detected, index) => {
          if (returnTensors) {
            face_detected.topLeft = face_detected.topLeft.arraySync();
            face_detected.bottomRight = face_detected.bottomRight.arraySync();
            if (annotateBoxes) {
              face_detected.landmarks = face_detected.landmarks.arraySync();
            }
          }
          const start = face_detected.topLeft;
          const end = face_detected.bottomRight;
          const size = [end[0] - start[0], end[1] - start[1]];

          // Render a rectangle over each detected face.
          // ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
          // ctx.fillRect(start[0], start[1], size[0], size[1]);

          // Tomar la imagen.
          return snap(start, size, index, img, model2,i);
        });
      
    
      }
     
      return array
   
    }).then((resp)=>{
    
        return resp
    });
 
    return embedding
};

const snap = (start, size, index, img, model2,i) => {

  const canvas2 = document.getElementById("output-upload-detail");
  canvas2 .getContext("2d").clearRect(0, 0, canvas2.width, canvas2.height);
  let canvas = document.getElementById(`output-upload${i}`);
const realTopLeftX= canvas.width-(start[0]+size[0])
  const modelImageSize = 160;
  let context = canvas2.getContext("2d");
  canvas2.width = canvas.width;
  canvas2.height = canvas.height;

  let imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, canvas.width, canvas.height);

  canvas2
    .getContext("2d")
    .putImageData(imageData, 0, 0, realTopLeftX, start[1], size[0], size[1]);
  // Dibujar la imagen recortada.
  
  let trimmedCanvas = trimCanvas(canvas2);
  imageData = trimmedCanvas
    .getContext("2d")
    .getImageData(0, 0, trimmedCanvas.width, trimmedCanvas.height);
    let baw_array0 = [];
    for (var i = 0; i < imageData.data.length; i += 4) {
      baw_array0.push(imageData.data[i]);
      baw_array0.push(imageData.data[i + 1]);
      baw_array0.push(imageData.data[i + 2]);
    }
    console.log("ARREGLO", JSON.stringify(baw_array0))
  canvas2.width = 160;
  canvas2.height = 160;
  trimmedCanvas
    .getContext("2d")
    .putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
  // Convertir la imagen del canvas en una imagen con un url.
  imageData = trimmedCanvas
  .getContext("2d")
  .getImageData(0, 0, 160, 160);
;

  let url = trimmedCanvas.toDataURL();

  const image = new Image();
  image.src = url;
  image.onload = () => {
   
    context.drawImage(image, 0, 0, 160, 160);
  };

trimmedCanvas.remove()

  let baw_array = [];
  for (var i = 0; i < imageData.data.length; i += 4) {
    baw_array.push(imageData.data[i]);
    baw_array.push(imageData.data[i + 1]);
    baw_array.push(imageData.data[i + 2]);
  }
  
  // Setear la imagen para poder visualizarla.
  let mean = getMean(baw_array)

  let std =getSTD(baw_array,mean)
 
  if(std>0){
  baw_array = getStandarizedArray(baw_array,mean,std)
  // console.log("PIXELS",JSON.stringify(baw_array))
  let finalIMG = tf_2.tensor(baw_array);

  finalIMG = tf_2.reshape(finalIMG, [1, modelImageSize, modelImageSize, 3]);
// console.log("MODEL",model2.getWeights()[0].print())
  let prediction = model2.predict(finalIMG);
  const value = prediction.dataSync();
  let prueba =model2.getWeights()[0].dataSync();

console.log("model",value)

  return value}else{return undefined}

};

const trimCanvas = (c) => {
  let ctx = c.getContext("2d"),
    copy = document.createElement("canvas"),
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
   
    copy.setAttribute('id', "trimmed-canvas");
    copy = copy.getContext("2d");
  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
  const cont = 5;
  let aux = 0;
  for (i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] !== 0) {
   

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
