import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChooseEmotions from "../components/ChooseEmotionsTest/index";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import ArcText from "arc-text";
import AddVideoPopUp from "../components/AddVideo/index";
import AddEmotionPopUp from "../components/AddEmotion/index";
import Item from "../components/ItemEmotion/index";
import Button from "../components/Button/index";
import Heading from "../components/Heading/index";
import { fetchEmotionsRequest, loading } from "../actions/Company";
import { fetchVideosRequest } from "../actions/Brands";
import polar from "../assets/images/Polar.png";
import Circle from "../components/CircleImageSmall/index";
import { BiHappy } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import "../styles/pages/__pages-dir.scss";
import UploadImage from "../components/UploadImage";
import "@webpunk/circular-text";
import { loadBackend } from "../helpers/Model/setUp";
import * as tf from "@tensorflow/tfjs-core";
import * as tf_2 from "@tensorflow/tfjs";

const TestModelAttention = ({}) => {
  const dispatch = useDispatch();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [predict, setPredict] = useState(false);
  const [error, setErrorMessage] = useState(null);
  let video = document.getElementById("webcam");
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [chooseEmotion, setChooseEmotion] = useState(false);
  const [videoSmall, setVideoSmall] = useState(false);
  const [attention, setAttention] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [display, setDisplay] = useState(false);
  let ctx, videoWidth, videoHeight, canvas, context ;
  const { _id } = useSelector((state) => ({
    ...state.auth,
  }));
  const state = useSelector((state) => ({
    ...state.auth,
  }));
  const name = useSelector((state) => ({ ...state.auth })).full_name;
  const emotions = useSelector((state) => ({ ...state.company })).emotions;
  const videos = useSelector((state) => ({ ...state.brands })).videos;
  const testInfo = useSelector((state) => state.stats.testInfo);
  const testImage = useSelector((state) => state.stats.image);
  const [sectionClass, setSectionClass] = useState("invisible");
  const blazeface = require("@tensorflow-models/blazeface");
  const faceLandmarksDetection = require("@tensorflow-models/face-landmarks-detection");
  const [landmarkDetectionModel, setLandmarkDetectionModel] =
  useState(undefined);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };
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
          loadLandmarkModel();
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
    if (videos.length === 0) {
      dispatch(fetchVideosRequest(_id));
    }
  }, []);

  useEffect(() => {
    if (emotions.length === 0) {
      dispatch(fetchEmotionsRequest(_id));
    }
  }, []);

  const predictWebcamLandmark = () => {
    try {
      if(videoPlaying){

        video.play();

        videoWidth = video.videoWidth;
        videoHeight = video.videoHeight;
        video.width = videoWidth;
        video.height = videoHeight;
        canvas = document.getElementById("output-test");
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
                setAttention(payingAttention)
                
                for (let i = 0; i < keypoints.length; i++) {
                  const [x, y, z] = keypoints[i];
                }
              }
            }else{
            
              setAttention(false);
            }
          });
          setTimeout(function () {
            requestAnimationFrame(predictWebcamLandmark);
          }, 10000);
        }
    } catch (error) {}
  };

  const getUserMediaSupported = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };
  const settingVideoSmall = () => {
    setDisplay(true);
    setOpenAdd(true);
  };

  const settingChooseEmotion = () => {
    setChooseEmotion(!chooseEmotion);
  };

  // useEffect(() => {
  
  //     handleEnableCamera();
  
  // }, []);
  // Enable the live webcam view and start classification.
  const enableCam = (event) => {

    // Only continue if the COCO-SSD has finished loading.


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
          console.log("error para habilitar la camara",error);
        });
    }
  

  const handleEnableCamera = (event) => {
    if (getUserMediaSupported()) {
      enableCam(event);
    } else {
      console.warn("getUserMedia() is not supported by your browser");
    }
  };

 const stopStreamedVideo=(videoElem)=> {
   setVideoPlaying(false)

  }
  useEffect(() => {
   if(videoPlaying){
    handleEnableCamera()
   }
  }, [videoPlaying]);
  return (
    <>


      <Sidebar
        drawerToggleClickHandler={drawerToggleClickHandler}
        color={"#A9B18F"}
      />
      <Drawer
        color={"#A9B18F"}
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />

      <div className="app-emotions-test">
        <>
          <h1
            className="subtitle"
            style={{ color: "black", marginTop: "0px", marginBottom: "40px" }}
          >
            Test Attention.
          </h1>
          <div className="test-results-container">
            <div className="test-results-container-1-test" >
        
            <video
              id="webcam"
              autoPlay
          
              style={{
                "-webkit-transform": "scaleX(-1)",
                transform: "scaleX(-1)",
              }}
            ></video>
            <canvas id="output-test"></canvas>

    
        
            </div>
            <div className="test-results-container-2-test">
              {attention !=null && videoPlaying ?
              <>
              {attention &&
              <h2
                style={{
                  marginTop: "0px",
                  marginBottom: "20px",
                  color:"rgb(169, 177, 143)"
                }}
              >
                Person IS paying attention
              </h2>}
              {attention===false && <h2
              style={{
                marginTop: "0px",
                marginBottom: "20px",
                color:"#FE5F55"
              }}
            >
             Person IS NOT paying attention
            </h2>}
              </>
             :null}
           
            </div>
          </div>
          {!videoPlaying ?
          <Button
            disable={error ? true : false}
            title={"Start."}
            position={"right"}
            event={()=>{setVideoPlaying(true);}}
          />
          :  <Button
          disable={error ? true : false}
          title={"Stop."}
          position={"right"}
          event={()=>{stopStreamedVideo(video)}}
        />}
        </>
      </div>
    </>
  );
};

export default TestModelAttention;
