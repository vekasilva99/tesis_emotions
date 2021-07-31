import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as tf from "@tensorflow/tfjs-core";
import * as tf_2 from "@tensorflow/tfjs";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import group from "./../assets/group.png";
import {getEmotion} from "../helpers/getEmotion";


  class scaling extends tf_2.layers.Layer {
    static className = 'scaling';
    constructor(config) {
      super(config);
    }
 }

    class l2Norm extends tf_2.layers.Layer {
      static className = 'l2Norm';
      constructor(config) {
        super(config);
      }
   }

   class L2Norm extends tf_2.layers.Layer {
    static className = 'L2Norm';
    constructor(config) {
      super(config);
    }
 }



const Embedding = (props) => {

  // DEFINICIÓN DE VARIABLES Y CONSTANTES.

  // Este es el tamaño de pixeles con el que fue entrenado el modelo.
  // El modelo de Manuel fue entrenado con imágenes blanco y negro. Es decir, 48x48x1
  const modelImageSize = 160;
  // Esta variable guardará el url de la imagen actual (la que capta del video cada cierto tiempo).
  // Inicialmente toma el valor de un archivo png cualquiera (group).
  const [currentImage, setCurrentImage] = useState(group);
  // Este es el modelo que reconoce los rostros.
  const blazeface = require("@tensorflow-models/blazeface");
  const faceLandmarksDetection = require('@tensorflow-models/face-landmarks-detection');
  // Esta variable guarda el valor de la clase para que pueda mostrar elementos de acuerdo a si el modelo se ha cargado o no.
  const [sectionClass, setSectionClass] = useState("invisible");
  // Esta variable es para poder acceder al video.
  let video = document.getElementById("webcam");
  // Guarda el modelo (en este caso, el modelo para el reconocimiento de rostros)
  const [model, setModel] = useState(undefined);
  const [model2, setModel2] = useState(undefined);
  const [landmarkDetectionModel, setLandmarkDetectionModel] = useState(undefined);
  // Este es el canvas donde se está dibujando la imagen cortada.
  const canvas2 = document.getElementById("canvas");
  // Variable que define el backend para poder cargar el modelo de blazeface.
  const state = {
    backend: "wasm",
  };
  // Definición de variables que serán utilizadas más adelante.
  let ctx, videoWidth, videoHeight, canvas, context;


  // const loadTensorflowModel = () => {
  //   const tf = require("@tensorflow/tfjs");
  //   const tfn = require("@tensorflow/tfjs-node");
  //   const handler = tfn.io.fileSystem("./path/to/your/model.json");
  //   const model = await tf.loadModel(handler);
  // }
  

  // Este método sirve para tomar solo la parte del canvas que tiene la imagen
  // Se deshace de todos los pixels tramsparentes.
  const trimCanvas = (c) => {

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
 
  // Capturar la imagen del video
  const snap = async (start, size, index) => {

    context = canvas2.getContext("2d");
    canvas2.width = videoWidth;
    canvas2.height = videoHeight;

    // Calcular la coordenada x real del top left, ya que el video está horizontalmente invertido.
    let realTopLeft_x = canvas2.width - (start[0] + size[0]);
    let imageWidth = size[0];
    const canvasWidth = canvas2.width;
    
    // Manejar cuando el rostro se sale de los bordes horizontales del video.
    if (realTopLeft_x > canvasWidth) {
      imageWidth = imageWidth - (canvasWidth - realTopLeft_x);
      realTopLeft_x = canvasWidth;
    }
    if (realTopLeft_x + imageWidth < 0) {
      imageWidth = realTopLeft_x;
      realTopLeft_x = realTopLeft_x - imageWidth;
    }

    // Calcular la coordenada y real del top left. 
    // Esta es la misma, ya que solo está invertido horizontalmente y no vertical.
    let realTopLeft_y = start[1];
    let imageHeight = size[1];
    const canvasHeight = canvas2.height;

    // Manejar cuando el rostro se sale de los bordes verticalmente del video.
    if (realTopLeft_y < 0) {
      imageHeight = imageHeight + realTopLeft_y;
      realTopLeft_y = 0;
    }

    if (imageHeight + realTopLeft_y > canvasHeight) {
      imageHeight = canvasHeight - realTopLeft_y;
    }

    // Dibujar la imagen recortada.
    context.drawImage(
      video,

      realTopLeft_x,
      realTopLeft_y,
      imageWidth,
      imageHeight,

      // realTopLeft_x,
      // realTopLeft_y,
      // modelImageSize+1,
      // modelImageSize+1,
      0,
      0,
      modelImageSize+1,
      modelImageSize+1,

    );

    // Capturar la imagen del rostro, deshaciéndose de los pixeles transparentes del canvas.
    let trimmedCanvas = trimCanvas(canvas2);

    
    const imageData = trimmedCanvas.getContext("2d").getImageData(
      0,
      0,
      trimmedCanvas.width,
      trimmedCanvas.height
    );

    // const imageData = canvas2.getContext("2d").getImageData(
    //     0,
    //     0,
    //     canvas2.width,
    //     canvas2.height
    // );
 
    // Convertir la imagen a blanco y negro y tener el array blanco y negro (un solo channel)
    let baw_array = [];
    for (var i=0;i<imageData.data.length;i+=4) {



        baw_array.push(imageData.data[i])
        baw_array.push(imageData.data[i+1])
        baw_array.push(imageData.data[i+2])
   
    
    }
    
    // Modificar el canvas con la imagen b&w.
    trimmedCanvas.getContext("2d").putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    // Convertir la imagen del canvas en una imagen con un url.
    let url = trimmedCanvas.toDataURL();
    // Setear la imagen para poder visualizarla.
    setCurrentImage(url);

    // Crear tensor con la información de la imagen ya en blanco y negro.
    console.log(JSON.stringify(baw_array));
    let finalIMG = tf.tensor(baw_array);
    finalIMG = tf.reshape(finalIMG, [1, modelImageSize, modelImageSize, 3])
    console.log('i', index);
    console.log('Shape de la imagen que le vamos a pasar al modelo', finalIMG.shape);
    let prediction = model2.predict(finalIMG)
    const value = prediction.dataSync()
    console.log("PREDICTION", value)
    // console.log("PREDICTION", getEmotion(value))

  };

  
  // Checkear si el acceso a la webCam es soportado por el navegador.
  const getUserMediaSupported = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  // Predecir el rostro.

  const predictWebcamLandmark = () => {

    video.play();

    videoWidth = video.videoWidth;
    videoHeight = video.videoHeight;
    video.width = videoWidth;
    video.height = videoHeight;
    canvas = document.getElementById("output");
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";

    landmarkDetectionModel
      .estimateFaces({
        input: video
      })
      .then( (predictions) => {
        if (predictions.length > 0) {
          /*
          `predictions` is an array of objects describing each detected face, for example:
      
          [
            {
              faceInViewConfidence: 1, // The probability of a face being present.
              boundingBox: { // The bounding box surrounding the face.
                topLeft: [232.28, 145.26],
                bottomRight: [449.75, 308.36],
              },
              mesh: [ // The 3D coordinates of each facial landmark.
                [92.07, 119.49, -17.54],
                [91.97, 102.52, -30.54],
                ...
              ],
              scaledMesh: [ // The 3D coordinates of each facial landmark, normalized.
                [322.32, 297.58, -17.54],
                [322.18, 263.95, -30.54]
              ],
              annotations: { // Semantic groupings of the `scaledMesh` coordinates.
                silhouette: [
                  [326.19, 124.72, -3.82],
                  [351.06, 126.30, -3.00],
                  ...
                ],
                ...
              }
            }
          ]
          */
      
          for (let i = 0; i < predictions.length; i++) {
       
            const keypoints = predictions[i].scaledMesh;
            // console.log('130',keypoints[130])
            // console.log('247',keypoints[247])
            // console.log('30',keypoints[30])
            // console.log('29',keypoints[29])
            // console.log('27',keypoints[27])
            // console.log('28',keypoints[28])
            // console.log('56',keypoints[56])
            // console.log('190',keypoints[190])
            // console.log('243',keypoints[243])
            // console.log('112',keypoints[112])
            // console.log('26',keypoints[26])
            // console.log('22',keypoints[22])
            // console.log('23',keypoints[23])
            // console.log('24',keypoints[24])
            // console.log('110',keypoints[110])
            // console.log('25',keypoints[25])
            // console.log('-------------------------------------')
            // console.log('33',keypoints[33])
            // console.log('246',keypoints[246])
            // console.log('161',keypoints[161])
            // console.log('160',keypoints[160])
            // console.log('159',keypoints[159])
            // console.log('158',keypoints[158])
            // console.log('157',keypoints[157])
            // console.log('173',keypoints[173])
            // console.log('133',keypoints[133])
            // console.log('155',keypoints[155])
            // console.log('154',keypoints[154])
            // console.log('153',keypoints[153])
            // console.log('145',keypoints[145])
            // console.log('144',keypoints[144])
            // console.log('163',keypoints[163])
            // console.log('7',keypoints[7])
            // Log facial keypoints.
            // const resta247 =Math.sqrt(Math.abs(((keypoints[247][0]-keypoints[25][0])^2)+((keypoints[247][1]-keypoints[25][1])^2)+((keypoints[247][2]-keypoints[25][2])^2)))
            // const resta30 =Math.sqrt(Math.abs(((keypoints[30][0]-keypoints[110][0])^2)+((keypoints[30][1]-keypoints[110][1])^2)+((keypoints[30][2]-keypoints[110][2])^2)))
            // const resta29 =Math.sqrt(Math.abs(((keypoints[29][0]-keypoints[24][0])^2)+((keypoints[29][1]-keypoints[24][1])^2)+((keypoints[29][2]-keypoints[24][2])^2)))
            // const resta27 =Math.sqrt(Math.abs(((keypoints[27][0]-keypoints[23][0])^2)+((keypoints[27][1]-keypoints[23][1])^2)+((keypoints[27][2]-keypoints[23][2])^2)))
            // const resta28 =Math.sqrt(Math.abs(((keypoints[28][0]-keypoints[22][0])^2)+((keypoints[28][1]-keypoints[22][1])^2)+((keypoints[28][2]-keypoints[22][2])^2)))
            // const resta56 =Math.sqrt(Math.abs(((keypoints[56][0]-keypoints[26][0])^2)+((keypoints[56][1]-keypoints[26][1])^2)+((keypoints[56][2]-keypoints[26][2])^2)))
            // const resta190 =Math.sqrt(Math.abs(((keypoints[190][0]-keypoints[112][0])^2)+((keypoints[190][1]-keypoints[112][1])^2)+((keypoints[190][2]-keypoints[112][2])^2)))
            // console.log('RESTA 247-25',resta247)
            // console.log('RESTA 30-110',resta30)
            // console.log('RESTA 29-24',resta29)
            // console.log('RESTA 27-23',resta27)
            // console.log('RESTA 28-22',resta28)
            // console.log('RESTA 56-26',resta56)
            // console.log('RESTA 190-112',resta190)

            // console.log('SUMA',resta247+resta30+resta29+resta27+resta28+resta56+resta190)


            const resta246 =Math.sqrt(Math.abs(((keypoints[246][0]-keypoints[7][0])^2)+((keypoints[246][1]-keypoints[7][1])^2)+((keypoints[246][2]-keypoints[7][2])^2)))
            const resta161 =Math.sqrt(Math.abs(((keypoints[161][0]-keypoints[163][0])^2)+((keypoints[161][1]-keypoints[163][1])^2)+((keypoints[161][2]-keypoints[163][2])^2)))
            const resta160 =Math.sqrt(Math.abs(((keypoints[160][0]-keypoints[144][0])^2)+((keypoints[160][1]-keypoints[144][1])^2)+((keypoints[160][2]-keypoints[144][2])^2)))
            const resta159 =Math.sqrt(Math.abs(((keypoints[159][0]-keypoints[145][0])^2)+((keypoints[159][1]-keypoints[145][1])^2)+((keypoints[159][2]-keypoints[145][2])^2)))
            const resta158 =Math.sqrt(Math.abs(((keypoints[158][0]-keypoints[153][0])^2)+((keypoints[158][1]-keypoints[153][1])^2)+((keypoints[158][2]-keypoints[153][2])^2)))
            const resta157 =Math.sqrt(Math.abs(((keypoints[157][0]-keypoints[154][0])^2)+((keypoints[157][1]-keypoints[154][1])^2)+((keypoints[157][2]-keypoints[154][2])^2)))
            const resta173 =Math.sqrt(Math.abs(((keypoints[173][0]-keypoints[155][0])^2)+((keypoints[173][1]-keypoints[155][1])^2)+((keypoints[173][2]-keypoints[155][2])^2)))

            const distancia33 =Math.sqrt(Math.abs(((keypoints[33][0]-keypoints[133][0])^2)+((keypoints[33][1]-keypoints[133][1])^2)+((keypoints[33][2]-keypoints[133][2])^2)))
            // console.log('RESTA 246-7',resta246)
            // console.log('RESTA 161-163',resta161)
            // console.log('RESTA 160-144',resta160)
            // console.log('RESTA 159-145',resta159)
            // console.log('RESTA 158-153',resta158)
            // console.log('RESTA 157-154',resta157)
            // console.log('RESTA 173-155',resta173)
            console.log('SUMA OJO IZQUIERDO',resta246+resta161+resta160+resta159+resta158+resta157+resta173)
            console.log('DISTANCIA IZQUIERDO',distancia33)


            const resta398 =Math.sqrt(Math.abs(((keypoints[398][0]-keypoints[382][0])^2)+((keypoints[398][1]-keypoints[382][1])^2)+((keypoints[398][2]-keypoints[7][382])^2)))
            const resta384 =Math.sqrt(Math.abs(((keypoints[384][0]-keypoints[381][0])^2)+((keypoints[384][1]-keypoints[381][1])^2)+((keypoints[384][2]-keypoints[381][2])^2)))
            const resta385 =Math.sqrt(Math.abs(((keypoints[385][0]-keypoints[380][0])^2)+((keypoints[385][1]-keypoints[380][1])^2)+((keypoints[385][2]-keypoints[380][2])^2)))
            const resta386 =Math.sqrt(Math.abs(((keypoints[386][0]-keypoints[374][0])^2)+((keypoints[386][1]-keypoints[374][1])^2)+((keypoints[386][2]-keypoints[374][2])^2)))
            const resta387 =Math.sqrt(Math.abs(((keypoints[387][0]-keypoints[373][0])^2)+((keypoints[387][1]-keypoints[373][1])^2)+((keypoints[387][2]-keypoints[373][2])^2)))
            const resta388 =Math.sqrt(Math.abs(((keypoints[388][0]-keypoints[390][0])^2)+((keypoints[388][1]-keypoints[390][1])^2)+((keypoints[388][2]-keypoints[390][2])^2)))
            const resta466 =Math.sqrt(Math.abs(((keypoints[466][0]-keypoints[249][0])^2)+((keypoints[466][1]-keypoints[249][1])^2)+((keypoints[466][2]-keypoints[249][2])^2)))

            const distancia362 =Math.sqrt(Math.abs(((keypoints[362][0]-keypoints[263][0])^2)+((keypoints[362][1]-keypoints[263][1])^2)+((keypoints[362][2]-keypoints[263][2])^2)))
            // console.log('RESTA 398-382',resta398)
            // console.log('RESTA 384-381',resta384)
            // console.log('RESTA 385-380',resta385)
            // console.log('RESTA 386-374',resta386)
            // console.log('RESTA 387-373',esta387)
            // console.log('RESTA 388-390',resta388)
            // console.log('RESTA 466-249',resta466)
            console.log('SUMA OJO DERECHO',resta398+resta384+resta385+resta386+resta387+resta388+resta466)
            console.log('DISTANCIA DERECHO',distancia362)
            console.log("------------------------------------------------------")

            for (let i = 0; i < keypoints.length; i++) {
              const [x, y, z] = keypoints[i];
      
              // console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
            }
          }
        }

      })

      setTimeout(function () {
        requestAnimationFrame(predictWebcamLandmark);
      }, 20000);


  }


  const predictWebcam = () => {

    video.play();

    videoWidth = video.videoWidth;
    videoHeight = video.videoHeight;
    video.width = videoWidth;
    video.height = videoHeight;
    canvas = document.getElementById("output");
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";

    const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
    const flipHorizontal = true;
    const annotateBoxes = true;

    // console.log("listo para hacer AI");

    model
      .estimateFaces(video, returnTensors, flipHorizontal, annotateBoxes)
      .then( (predictions) => {

        if (predictions.length > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          /*
                    `predictions` is an array of objects describing each detected face, for example:
                
                    [
                        {
                        topLeft: [232.28, 145.26],
                        bottomRight: [449.75, 308.36],
                        probability: [0.998],
                        landmarks: [
                            [295.13, 177.64], // right eye
                            [382.32, 175.56], // left eye
                            [341.18, 205.03], // nose
                            [345.12, 250.61], // mouth
                            [252.76, 211.37], // right ear
                            [431.20, 204.93] // left ear
                        ]
                        }
                    ]
                    */

          console.log('predictions length', predictions.length);

          predictions.map( (face_detected, index) => {

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
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fillRect(start[0], start[1], size[0], size[1]);

            // Tomar la imagen.
            snap(start, size, index);
            
            if (annotateBoxes) {
              const landmarks = face_detected.landmarks;
              ctx.fillStyle = "blue";
              landmarks.map( (mark) => {
                const x = mark[0];
                const y = mark[1];
                ctx.fillRect(x, y, 5, 5);
              })
              // for (let j = 0; j < landmarks.length; j++) {
              //   const x = landmarks[j][0];
              //   const y = landmarks[j][1];
              //   ctx.fillRect(x, y, 5, 5);
              // }
            }
            
          })

          // for (let i = 0; i < predictions.length; i++) {

          //   if (returnTensors) {
          //     predictions[i].topLeft = predictions[i].topLeft.arraySync();
          //     predictions[i].bottomRight = predictions[i].bottomRight.arraySync();
          //     if (annotateBoxes) {
          //       predictions[i].landmarks = predictions[i].landmarks.arraySync();
          //     }
          //   }
          //   const start = predictions[i].topLeft;
          //   const end = predictions[i].bottomRight;
          //   const size = [end[0] - start[0], end[1] - start[1]];

          //   // Render a rectangle over each detected face.
          //   ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
          //   ctx.fillRect(start[0], start[1], size[0], size[1]);

          //   // Tomar la imagen.
          //   snap(start, size, i);
            

          //   if (annotateBoxes) {
          //     const landmarks = predictions[i].landmarks;

          //     ctx.fillStyle = "blue";
          //     for (let j = 0; j < landmarks.length; j++) {
          //       const x = landmarks[j][0];
          //       const y = landmarks[j][1];
          //       ctx.fillRect(x, y, 5, 5);
          //     }
          //   }
          // }
        }
        // Cada medio minuto (30 segundos)
        setTimeout(function () {
          requestAnimationFrame(predictWebcam);
        }, 10000);
        // requestAnimationFrame(predictWebcam)
      });
  };

  // Enable the live webcam view and start classification.
  const enableCam = (event) => {

    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
      console.log("no hay modelo");
      return;
    } else {
      console.log("habemus modelo");
      // Hide the button once clicked.
      event.target.classList.add("removed");

      // getUsermedia parameters to force video but not audio.
      const constraints = {
        // video: true
        video: {
          facingMode: "user",
        },
      };

      // Activate the webcam stream.
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          console.log("camara habilitada");
          video.srcObject = stream;
          video.addEventListener("loadeddata", predictWebcamLandmark);
        })
        .catch((error) => {
          console.log("error para habilitar la camara");
        });
    }
  };

  const handleEnableCamera = (event) => {
    if (getUserMediaSupported()) {
      enableCam(event);
    } else {
      console.warn("getUserMedia() is not supported by your browser");
    }
  };

  const loadLandmarkModel = async () =>{
  
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
  
      setLandmarkDetectionModel(model)

      console.log('MODELITO',model)
  }



  const setupPage = () => {

    tf.setBackend(state.backend).then(() => {
      
      console.log("back ready ");
      blazeface
        .load()
        .then( (loadedModel) => {
          loadModel()
          loadLandmarkModel()
          setModel(loadedModel);
          setSectionClass("");
          console.log("modelo cargado");
        })
        .catch((error) => {
          console.log(error);
          console.log("no cargo");
        });
    });
  };

  useEffect(() => {
    setupPage();
    return () => {};
  }, []);
const loadModel = async () =>{
  
  tf_2.serialization.registerClass(scaling);
  tf_2.serialization.registerClass(l2Norm);
  tf_2.serialization.registerClass(L2Norm);

setModel2(await tf_2.loadLayersModel('http://localhost:8887/model.json'))
console.log('holaaas')
}

  // useEffect(() => {
  //   loadModel();

  // }, []);
  return (
    <div>
      <div>Manuel Model</div>

      <div
        className="prediction-div"
        style={{
          backgroundImage: `url(${currentImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      ></div>

      {/* <div style={{'height': '150px', 'width':'250px'}}>
          {position}
      </div> */}

      <div id="demos" className={sectionClass}>
        <button id="webcamButton" onClick={handleEnableCamera}>
          Enable Webcam
        </button>
        <div id="liveView" className="camView2">
          <video
            id="webcam"
            autoPlay
            width="640"
            height="480"
            style={{
              "-webkit-transform": "scaleX(-1)",
              transform: "scaleX(-1)",
            }}
            // playsinline
          ></video>
          <canvas id="output"></canvas>

          <canvas
            id="canvas"
            // width={modelImageSize}
            // height={modelImageSize}
            width="640"
            height="480"
            // style={{
            //   "-webkit-transform": "scaleX(-1)",
            //   transform: "scaleX(-1)",
            // }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

Embedding.propTypes = {};

export default Embedding;