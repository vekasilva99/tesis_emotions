import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import YouTube from "react-youtube";
import * as tf from "@tensorflow/tfjs-core";
import * as tf_2 from "@tensorflow/tfjs";
import { useParams } from "react-router-dom";
import { trimCanvas } from "../helpers/Model/methods";
import { useDispatch, useSelector } from "react-redux";
import Circle from "../components/CircleImage/index";
import CircularText from "../components/CircularText/index";
import Item from "../components/Item/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import adidasLogo from "../assets/images/adidas.png";
import benefitLogo from "../assets/images/benefit.png";
import cocaColaLogo from "../assets/images/cocaCola.png";
import lorealLogo from "../assets/images/loreal.png";
import neutrogenaLogo from "../assets/images/neutrogena.png";
import nikeLogo from "../assets/images/nike.png";
import Button from "../components/Button/index";
import group from "../assets/group.png";
import { scaling, l2Norm} from "../helpers/Model/modelClasses";
import { loadBackend } from "../helpers/Model/setUp";
import { YouTubeGetID } from "../helpers/Model/methods";
import "../styles/pages/__pages-dir.scss";
import { fetchVideoRequest } from "../actions/Brands";
import { createViewRequest } from "../actions/Model";
import ErrorPopUpModel from "../components/ErrorPopUpModel/index";
import NotLoading from "../components/NotLoading";
import { getMean, getSTD, getStandarizedArray } from "../helpers/Model/methods";
const VideoWatch = (props) => {
  // DEFINICIÓN DE VARIABLES Y CONSTANTES.
  const { id, videoId } = useParams();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [duration, setDuration] = useState(false);
  const [attention, setAttention] = useState(null);
  const [embedding, setEmbedding] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [predict, setPredict] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const { token, _id, role, country, birthdate, gender } = useSelector(
    (state) => ({
      ...state.auth,
    })
  );

  // Este es el tamaño de pixeles con el que fue entrenado el modelo.
  const modelImageSize = 160;
  // Esta variable guardará el url de la imagen actual (la que capta del video cada cierto tiempo).
  // Inicialmente toma el valor de un archivo png cualquiera (group).
  const [currentImage, setCurrentImage] = useState(group);
  // Este es el modelo que reconoce los rostros.
  const blazeface = require("@tensorflow-models/blazeface");
  const faceLandmarksDetection = require("@tensorflow-models/face-landmarks-detection");
  // Esta variable guarda el valor de la clase para que pueda mostrar elementos de acuerdo a si el modelo se ha cargado o no.
  const [sectionClass, setSectionClass] = useState("invisible");
  // Esta variable es para poder acceder al video.
  let video = document.getElementById("webcam");
  // Guarda el modelo (en este caso, el modelo para el reconocimiento de rostros)
  const [model, setModel] = useState(undefined);
  const [model2, setModel2] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [landmarkDetectionModel, setLandmarkDetectionModel] =
    useState(undefined);
  // Este es el canvas donde se está dibujando la imagen cortada.
  const canvas2 = document.getElementById("canvas");
  // Variable que define el backend para poder cargar el modelo de blazeface.
  // Definición de variables que serán utilizadas más adelante.
  let ctx, videoWidth, videoHeight, canvas, context, stream;
  const { selectedCompany, selectedVideo, loader } = useSelector((state) => ({
    ...state.brands,
  }));

  useEffect(() => {
    dispatch(fetchVideoRequest({ company: id, video: videoId }));
  }, []);

  const getVisibility = () => {
    return visible;
  };

  useEffect(() => {
    const timer = setTimeout(function () {
      if (!visible && error===null) {
        setErrorMessage(
          "Tenemos algunos problemas para cargar el modelo de IA. Asegúrese de verificar su conexión."
        );
      }
    }, 100000);
    return () => clearTimeout(timer);
  });

  const loadLandmarkModel = async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
    setLandmarkDetectionModel(model);
  };

  const setupPage = async () => {
    loadBackend().then(async () => {
      console.log("back ready ");
      let r = await blazeface
        .load()
        .then((loadedModel) => {
          loadModel();
          loadLandmarkModel();
          setModel(loadedModel);
          setSectionClass("");
          console.log("modelo cargado");
        })
        .catch((error) => {
          console.log("Error", error);
          console.log("no cargo");
        });
    });
  };

  useEffect(() => {
    setupPage();
    return () => {};
  }, []);
  useEffect(() => {
    if (attention != null && embedding !=null) {
      if(embedding.embedding.length===0){
        dispatch(
          createViewRequest({
            embedding: embedding.embedding,
            time: embedding.time,
            user: getUserInfo(),
            attention: false,
            videoID: videoId,
          })
        );
      }else{
      dispatch(
        createViewRequest({
          embedding: embedding.embedding,
          time: embedding.time,
          user: getUserInfo(),
          attention: attention,
          videoID: videoId,
        })
      );
      }
      setEmbedding(null);
      setAttention(null);
    }
  }, [attention, embedding]);
  const loadModel = async () => {
    tf_2.serialization.registerClass(scaling);
    tf_2.serialization.registerClass(l2Norm);


 
    try{
    console.log("EMPEZANDO");
    // setModel2(await tf_2.loadLayersModel(process.env.REACT_APP_MODEL_AWS));
       setModel2(await tf_2.loadLayersModel('http://localhost:8887/model.json'))
    console.log("TERMINADO");
    setVisible(true);
    }catch(error){
      setError('Oops! Parece que algo salió mal al cargar el modelo. Limpia tu caché y vuelve a intentarlo. Perdon por la inconveniencia.')
 
    }
  };

  useEffect(() => {
    if (startTimer) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timer);
    }
  });

  const calculateTimeLeft = () => {
    let timeLeftAux = timeLeft + 1;

    return timeLeftAux;
  };
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const opts = {
    height: (window.innerHeight * 0.7).toString(),
    width: (window.innerWidth * 0.7).toString(),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      disablek: 1,
    },
  };

  useEffect(() => {
    if (startTimer) {
      handleEnableCamera();
    }
  }, [startTimer]);

  useEffect(() => {
    if (predict && startTimer) {
      const timer = setTimeout(function () {
        requestAnimationFrame(predictWebcam);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    if (predict && startTimer) {
      const timer = setTimeout(function () {
        requestAnimationFrame(predictWebcamLandmark);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const getAge = (birthDate) => {
    const today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getUserInfo = () => {
    if (token && _id && role) {
      return {
        age: getAge(new Date(birthdate)),
        country: country,
        gender: gender,
      };
    } else {
      let info = JSON.parse(localStorage.getItem("user"));
      return info;
    }
  };
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
      modelImageSize + 1,
      modelImageSize + 1
    );

    // Capturar la imagen del rostro, deshaciéndose de los pixeles transparentes del canvas.
    let trimmedCanvas = trimCanvas(canvas2);

    const imageData = trimmedCanvas
      .getContext("2d")
      .getImageData(0, 0, trimmedCanvas.width, trimmedCanvas.height);

    // const imageData = canvas2.getContext("2d").getImageData(
    //     0,
    //     0,
    //     canvas2.width,
    //     canvas2.height
    // );

    // Convertir la imagen a blanco y negro y tener el array blanco y negro (un solo channel)
    let baw_array = [];
    for (var i = 0; i < imageData.data.length; i += 4) {
      baw_array.push(imageData.data[i]);
      baw_array.push(imageData.data[i + 1]);
      baw_array.push(imageData.data[i + 2]);
    }

    // Modificar el canvas con la imagen b&w.
    console.log("ACA ESTA EL ARREGLO",JSON.stringify(baw_array))
    trimmedCanvas
      .getContext("2d")
      .putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    // Convertir la imagen del canvas en una imagen con un url.
    let url = trimmedCanvas.toDataURL();
    // Setear la imagen para poder visualizarla.
    setCurrentImage(url);
    console.log("shape", baw_array);
    // Crear tensor con la información de la imagen ya en blanco y negro.
    let mean = getMean(baw_array);
    let std = getSTD(baw_array, mean);
    if (std > 0) {
      baw_array = getStandarizedArray(baw_array, mean, std);
      console.log("ACA ESTA EL ARREGLO Stan",JSON.stringify(baw_array))
      let finalIMG = tf.tensor(baw_array);
      finalIMG = tf.reshape(finalIMG, [1, modelImageSize, modelImageSize, 3]);
      let prediction = model2.predict(finalIMG);
      let value = prediction.dataSync();
      let auxArray = [];

      var arrayString = JSON.stringify(value);
      value = JSON.parse(arrayString);
      console.log("ACA ESTA EL ARREGLO Final",JSON.stringify(prediction.arraySync()))
      let aux = [];

      for (let j = 0; j < 16; j++) {
        aux.push(value[j]);
      }
      let embedding = {
        time: timeLeft,
        embedding: aux,
      };
      setEmbedding(embedding);
    }
  };

  const predictWebcam = () => {
    try {
      if (
        predict &&
        startTimer &&
        timeLeft <= duration &&
        timeLeft > 0 &&
        timeLeft % 5 === 0
      ) {
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

        model
          .estimateFaces(video, returnTensors, flipHorizontal, annotateBoxes)
          .then((predictions) => {
            if (predictions.length > 0) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);

              predictions.map((face_detected, index) => {
                if (index === 0) {
                  if (returnTensors) {
                    face_detected.topLeft = face_detected.topLeft.arraySync();
                    face_detected.bottomRight =
                      face_detected.bottomRight.arraySync();
                    if (annotateBoxes) {
                      face_detected.landmarks =
                        face_detected.landmarks.arraySync();
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
                    landmarks.map((mark) => {
                      const x = mark[0];
                      const y = mark[1];
                      ctx.fillRect(x, y, 5, 5);
                    });
                  }
                }
              });
            }else{
              setEmbedding( {
                time: timeLeft,
                embedding: [],
              });
            }
          });
      }
    } catch (error) {}
  };

  const predictWebcamLandmark = () => {
    try {
      if (
        predict &&
        startTimer &&
        timeLeft <= duration &&
        timeLeft > 0 &&
        timeLeft % 5 === 0
      ) {
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
            input: video,
          })
          .then((predictions) => {
            if (predictions.length > 0) {
              console.log("ENTRE A PREDICTION")
              for (let i = 0; i < predictions.length; i++) {
                const keypoints = predictions[i].scaledMesh;

                const left_eye_1 = Math.abs(
                  keypoints[246][1] - keypoints[7][1]
                );
                const left_eye_2 = Math.abs(
                  keypoints[161][1] - keypoints[163][1]
                );
                const left_eye_3 = Math.abs(
                  keypoints[160][1] - keypoints[144][1]
                );
                const left_eye_4 = Math.abs(
                  keypoints[159][1] - keypoints[145][1]
                );
                const left_eye_5 = Math.abs(
                  keypoints[158][1] - keypoints[153][1]
                );
                const left_eye_6 = Math.abs(
                  keypoints[157][1] - keypoints[154][1]
                );
                const left_eye_7 = Math.abs(
                  keypoints[173][1] - keypoints[155][1]
                );

                const left_distance = Math.abs(
                  keypoints[33][0] - keypoints[133][0]
                );
                const left_eye_sum =
                  left_eye_1 +
                  left_eye_2 +
                  left_eye_3 +
                  left_eye_4 +
                  left_eye_5 +
                  left_eye_6 +
                  left_eye_7;

                const right_eye_1 = Math.abs(
                  keypoints[398][1] - keypoints[382][1]
                );
                const right_eye_2 = Math.abs(
                  keypoints[384][1] - keypoints[381][1]
                );
                const right_eye_3 = Math.abs(
                  keypoints[385][1] - keypoints[380][1]
                );
                const right_eye_4 = Math.abs(
                  keypoints[386][1] - keypoints[374][1]
                );
                const right_eye_5 = Math.abs(
                  keypoints[387][1] - keypoints[373][1]
                );
                const right_eye_6 = Math.abs(
                  keypoints[388][1] - keypoints[390][1]
                );
                const right_eye_7 = Math.abs(
                  keypoints[466][1] - keypoints[249][1]
                );

                const right_distance = Math.abs(
                  keypoints[362][0] - keypoints[263][0]
                );
                const right_eye_sum =
                  right_eye_1 +
                  right_eye_2 +
                  right_eye_3 +
                  right_eye_4 +
                  right_eye_5 +
                  right_eye_6 +
                  right_eye_7;

                // console.log("SUMA OJO IZQUIERDO", left_eye_sum.toFixed(2));
                // console.log("SUMA OJO DERECHO", right_eye_sum.toFixed(2));
                // console.log("DISTANCIA IZQUIERDO", left_distance.toFixed(2));
                // console.log("DISTANCIA DERECHO", right_distance.toFixed(2));
                // console.log(
                //   "------------------------------------------------------"
                // );
                let payingAttention = false;

                if (
                  left_distance + right_distance >
                    process.env.REACT_APP_SUMA_DISTANCIA &&
                  left_eye_sum + right_eye_sum > process.env.REACT_APP_SUMA
                ) {
                  payingAttention = true;
                }
                setAttention(payingAttention);
                for (let i = 0; i < keypoints.length; i++) {
                  const [x, y, z] = keypoints[i];
                }
              }
            }else{
              setAttention(false);
            }
          });
      }
    } catch (error) {}
  };

  const enableCam = async () => {
    const constraints = {
      video: {
        facingMode: "user",
      },
    };
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      /* use the stream */
    } catch (err) {
      /* handle the error */
    }
  };

  const getUserMediaSupported = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  const handleEnableCamera = () => {
    if (getUserMediaSupported()) {
      enableCam();
      video.addEventListener("loadeddata", setPredict(true));
    } else {
      console.warn("getUserMedia() is not supported by your browser");
    }
  };

  const onReady = (event) => {
    // event.target.pauseVideo();
    setStartTimer(true);
  };

  const onReady2 = (event) => {
    setDuration(event.target.getDuration());
  };

  const onPause = (event) => {
    setStartTimer(false);
  };

  return (
    <>
      <NotLoading message={errorMessage} setMessage={setErrorMessage} />
      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
      <ErrorPopUpModel error={error} setError={setError} />
      <div className="app-video-detail-watch">
        <h1 className="video-watch-title">{selectedVideo.name}</h1>
        {/* <span>{timeLeft}s</span> */}
        <div className="big-video-container">
          <div id="liveView" className="video-container cam">
            <video
              id="webcam"
              autoPlay
              width="640"
              height="480"
              style={{
                "-webkit-transform": "scaleX(-1)",
                transform: "scaleX(-1)",
              }}
            ></video>
            <canvas id="output"></canvas>

            <canvas id="canvas" width="640" height="480"></canvas>
          </div>
          {visible && selectedVideo ? (
            <div className="video-container">
              <div style={{ width: "100%", height: "100%" }}>
                <YouTube
                  videoId={YouTubeGetID(selectedVideo.link)}
                  opts={opts}
                  onPlay={onReady}
                  onReady={onReady2}
                  onPause={onPause}
                  onEnd={onPause}
                  onError={onPause}
                />
              </div>
            </div>
          ) : (
            <div className="video-container">
              <CircularProgress size={100} thickness={5} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoWatch;
