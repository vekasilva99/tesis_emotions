import React, { useEffect, useState, useRef } from "react";
import "../../styles/components/__components-dir.scss";
import polar from "../../assets/images/Polar.png";
import Item from "./item";
import Input from "../Input/index";
import { FaPlus } from "react-icons/fa";
import Button from "../ButtonPopUp/index";
import * as tf from "@tensorflow/tfjs-core";
import * as tf_2 from "@tensorflow/tfjs";
import {
  getMean,
  getSTD,
  getStandarizedArray,
} from "../../helpers/Model/methods";
import { getEmbedding } from "../../helpers/getEmbedding";
import { addEmotionRequest, loading } from "../../actions/Company";
import { useDispatch, useSelector } from "react-redux";
import ErrorPopUp from "../../components/ErrorPopUp/index";
import ErrorPopUpModel from "../../components/ErrorPopUpModel/index";
import SuccessPopUp from "../../components/SuccessPopUp/index";
import CircularProgress from "@material-ui/core/CircularProgress";

class scaling extends tf_2.layers.Layer {
  static className = "scaling";
  constructor(config) {
    super(config);
    this.scale = config.scale;
  }
  call(input) {
    return tf_2.tidy(() => {
      //   console.log("SCALE ",this)
      // console.log("SCALE Antes",JSON.stringify(input[0].arraySync()))
      // console.log("SCALE Despues",input[0].mul(this.scale).dataSync())
      return input[0].mul(this.scale);
      // return tf_2.math.l2_normalize(input,-1,1e-12,this.name)
    });
  }
  getConfig() {
    const config = super.getConfig();
    Object.assign(config, { scale: this.scale });
    return config;
  }
}

class l2Norm extends tf_2.layers.Layer {
  static className = "l2Norm";
  constructor(config) {
    super(config);
  }

  call(input) {
    return tf_2.tidy(() => {
      // console.log("SJA ANTES",JSON.stringify(input[0].arraySync()))
      // console.log("SJA",input[0].div(tf_2.sqrt(tf_2.maximum(tf_2.sum(tf_2.square(input[0])), 1e-12))).dataSync())
      return input[0].div(
        tf_2.sqrt(tf_2.maximum(tf_2.sum(tf_2.square(input[0])), 1e-12))
      );
      // return tf_2.math.l2_normalize(input,-1,1e-12,this.name)
    });
  }
}

const ChooseEmotionPopUp = ({ settingChooseEmotion, open, setOpen,error,setErrorMessage }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([
    { image: null },
    { image: null },
    { image: null },
  ]);
  const [preview, setPreview] = useState(null);
  const [finalArray, setFinalArray] = useState(null);
  const [emotionsEmbeddings, setEmotionsEmbeddings] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const blazeface = require("@tensorflow-models/blazeface");
  const faceLandmarksDetection = require("@tensorflow-models/face-landmarks-detection");
  const [model, setModel] = useState(undefined);
  const [model2, setModel2] = useState(undefined);

  const modelImageSize = 160;
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);
  const { _id } = useSelector((state) => ({
    ...state.auth,
  }));
  const errors = useSelector((state) => ({ ...state.company.error }));
  const success = useSelector((state) => ({ ...state.company.success }));
  const loader = useSelector((state) => ({ ...state.company })).loaderCompany;
  console.log("LOADER", loader);
  const uploadImages = (files, index) => {
    let auxImages = images;
    let auxFiles = images.filter((image) => image.image === null);
    if (auxFiles.length > 0 && files.length <= 3) {
      for (let j = 0; j < files.length; j++) {
        for (var i = 0; i < auxImages.length; i++) {
          if (auxImages[i].image == null) {
            auxImages[i].image = files[j];
            let canvas = document.getElementById(
              `output-upload` + (i + 1).toString()
            );
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const image = new Image();
            image.src = URL.createObjectURL(files[j]);
            image.onload = () => {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            };
            canvas
            .getContext("2d")
            .getImageData(0, 0, canvas.width, canvas.height);
            break;
          }
        }
      }
    }else{
      auxImages[index].image = files[0];
            let canvas = document.getElementById(
              `output-upload` + (index + 1).toString()
            );
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const image = new Image();
            image.src = URL.createObjectURL(files[0]);
            image.onload = () => {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            };
            canvas
            .getContext("2d")
            .getImageData(0, 0, canvas.width, canvas.height);
    }
    try{
    setPreview(URL.createObjectURL(files[0]));
    }catch(error){

    }
  };
 
  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Ingrese Emoción",
      name: "Nombre de Emoción",
      value: "",
      error: "",
      type: "text",
    },
  ]);

  const changeInput = (name, event) => {
    let fields = inputFields;
    var item = inputFields.find(function (input, index) {
      if (input.name == name) fields[index].value = event;

      setInputFields(fields);
    });
  };

  async function loadBackend() {
    await tf.ready();
    return tf.getBackend();
  }

  const setupPage = async () => {
    // loadBackend().then((backend) => console.log("Logrado")
    //  .catch((e) => console.log(`Failed to load backend: ${e}`, true)))

    loadBackend().then(async () => {
      console.log("back ready ");
      let r = await blazeface
        .load()
        .then((loadedModel) => {
          loadModel();
          setModel(loadedModel);
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
    if (Object.keys(success).length > 0 && open === true) {
      let auxFields = inputFields;
      auxFields[0].value = "";
      setInputFields(auxFields);
      setImages([{ image: null }, { image: null }, { image: null }]);
      for (let i = 0; i < images.length; i++) {
        let canvas = document.getElementById(
          `output-upload` + (i + 1).toString()
        );
        let context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      setOpen(false);
    }
  }, [success]);

  const loadModel = async () => {
    tf_2.serialization.registerClass(scaling);
    tf_2.serialization.registerClass(l2Norm);


    
    try{
    console.log("EMPEZANDO");
    // setModel2(await tf_2.loadLayersModel('http://localhost:8887/model.json'))
    setModel2(await tf_2.loadLayersModel(process.env.REACT_APP_MODEL_AWS));
    console.log("TERMINADO");
    }catch(error){
      console.log(error)
      setErrorMessage('Oops! Parece que algo salió mal al cargar el modelo. Limpia tu caché y vuelve a intentarlo. Perdon por la inconveniencia.')
 
    }
  };

  const setError = (input, index, error) => {
    if (input) {
      let fields = inputFields;
      fields[index].error = error;
      setInputFields(fields);
    }
  };

  useEffect(() => {
    
    if (finalArray != null) {
      let result = undefined;
      let auxArray = emotionsEmbeddings;
      let baw_array = [];
      for (var i = 0; i < finalArray.imageData.data.length; i += 4) {
        baw_array.push(finalArray.imageData.data[i]);
        baw_array.push(finalArray.imageData.data[i + 1]);
        baw_array.push(finalArray.imageData.data[i + 2]);
      }
 
      console.log("ARREGLO", JSON.stringify(baw_array));
      // Setear la imagen para poder visualizarla.
      let mean = getMean(baw_array);

      let std = getSTD(baw_array, mean);
      console.log("MEAN", mean);
      console.log("STD", std);
      if (std > 0) {
        baw_array = getStandarizedArray(baw_array, mean, std);
        console.log("PIXELS",JSON.stringify(baw_array))
        let finalIMG = tf_2.tensor(baw_array);

        finalIMG = tf_2.reshape(finalIMG, [
          1,
          modelImageSize,
          modelImageSize,
          3,
        ]);
  
        let prediction = model2.predict(finalIMG);
        const value = prediction.dataSync();
        result = value;
      }
      console.log("MODEL", JSON.stringify(result));
      var arrayString = JSON.stringify(result);
      result = JSON.parse(arrayString);
    
      let aux = [];

      for (let j = 0; j < 16; j++) {
 
        aux.push(result[j]);
      }
     
      let auxItem = {
        img: finalArray.img,
        embedding: aux,
      };
      setFinalArray(null);
      auxArray.push(auxItem);
      console.log('Emotions',auxArray)
    setEmotionsEmbeddings(auxArray)
    if(auxArray.length===3){
    setSubmitted(false);
    dispatch(
      addEmotionRequest({
        emotion: inputFields[0].value,
        company: _id,
        embeddings: auxArray,
      })
    );
    setEmotionsEmbeddings([])
    }

    }
  }, [finalArray]);




  const getEmbedding = async (img, model, model2, i) => {
    let canvas = document.getElementById(`output-upload${i}`);
    let ctx = canvas.getContext("2d");

    const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
    const flipHorizontal = true;
    const annotateBoxes = true;

    // console.log(
    //   "kik;",
    //   canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height)
    // );
    const embedding = await model
      .estimateFaces(canvas, returnTensors, flipHorizontal, annotateBoxes)
      .then((predictions) => {
        let array = [];
        if (predictions.length > 0) {
          // console.log("blazeface is", model);

          array = predictions.map((face_detected, index) => {
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
            snap(start, size, index, img, model2, i);
          });
        }

        return array;
      })
      .then((resp) => {
        return resp;
      });

    return embedding;
  };

  const snap = (start, size, index, img, model2, i) => {
    const canvas2 = document.getElementById("output-upload-detail");
    canvas2.getContext("2d").clearRect(0, 0, canvas2.width, canvas2.height);
    let canvas = document.getElementById(`output-upload${i}`);
    const realTopLeftX = canvas.width - (start[0] + size[0]);
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
    imageData = canvas2
      .getContext("2d")
      .getImageData(0, 0, canvas2.width, canvas2.height);

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

    // console.log("ARREGLO", baw_array0);
    // console.log("ARREGLO", trimmedCanvas.width, trimmedCanvas.height);

    canvas2.width = 160;
    canvas2.height = 160;
    trimmedCanvas
      .getContext("2d")
      .putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);

    // Convertir la imagen del canvas en una imagen con un url.
    imageData = trimmedCanvas.getContext("2d").getImageData(0, 0, 160, 160);

    let url = trimmedCanvas.toDataURL();

    const image = new Image();
    image.src = url;

    image.onload = async () => {
      await context.drawImage(image, 0, 0, 160, 160);

      imageData = await context.getImageData(
        0,
        0,
        canvas2.width,
        canvas2.height
      );
      setFinalArray({imageData:imageData,img:img});
    };

    context.fillStyle = "rgba(255, 0, 0, 0.5)";
    context.fillRect(0, 0, 170, 170);
    trimmedCanvas.remove();
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

    copy.setAttribute("id", "trimmed-canvas");
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
  return (
    <>
      <div
        className={
          loader || submitted
            ? "full-page-loader no-background"
            : "full-page-loader no-background not-loading"
        }
      >
        <CircularProgress size={100} thickness={5} />
      </div>
      <ErrorPopUpModel error={error} setError={setErrorMessage} />
      <ErrorPopUp company={true} inputs={inputFields} />
      <SuccessPopUp company={true} inputs={inputFields} />
      <div className={open ? "pop-up-container" : "pop-up-container closed"}>
        <div className="close-pop-up"> <h3
              onClick={() => {
          setOpen(false)
              }}
            >
              Cerrar
            </h3></div>
        <div className="pop-up-content">
          <h4>Nueva Emoción</h4>

          <div className="pop-up-item-new-emotion">
            <div className="pop-up-item-new-emotion-1">
              {inputFields.map((input, index) => (
                <Input
                  changeError={setError}
                  index={index}
                  setSubmitted={() => {
                    setSubmitted(false);
                  }}
                  submitted={submitted}
                  item={input}
                  changeInput={changeInput}
                />
              ))}
              <div className="pop-up-item-new-emotion-1-container">
                {images.map((image, index) => (
                  <label
                    style={{ marginBottom: "5px" }}
                    className="upload-button"
                  >
                    <input
                      style={{ visibility: "hidden" }}
                      onChange={(event) => {
                        uploadImages(event.target.files, index);
                      }}
                      type="file"
                      accept="image/*"
                      multiple={image.image == null ? true : false}
                    />
                    <canvas
                      className="upload-button-image"
                      id={`output-upload` + (index + 1).toString()}
                    ></canvas>
                    {
                      image.image === null ? (
                        <FaPlus className="upload-button-icon" />
                      ) : null
                      // <img

                      //   className="upload-button-image"
                      //   src={URL.createObjectURL(image.image)}
                      // />
                    }
                  </label>
                ))}
              </div>
            </div>
            <div className="pop-up-item-new-emotion-2">
              {/* <p>
               Suba las tres imagenes que mejor describan la emoción o expresión que desea agregar. 
               Recuerde que los resultados obtenidos dependeran de esto.{" "}
              </p> */}
              <canvas
                style={{ background: "pink"
                , visibility: "hidden" 
              }}
                id={`output-upload-detail`}
              ></canvas>
            </div>
          </div>
          <Button
            title={"Agregar."}
            position={"right"}
            event={async () => {
              // videoSmall();

              let auxArray = [];

              for (let i = 0; i < images.length; i++) {
                let auxEmbedding = await getEmbedding(
                  images[i].image,
                  model,
                  model2,
                  i + 1
                );
              }
               
           
           
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ChooseEmotionPopUp;
