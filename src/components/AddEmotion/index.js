import React, { useEffect, useState, useRef } from "react";
import "../../styles/components/__components-dir.scss";
import polar from "../../assets/images/Polar.png";
import Item from "./item";
import Input from "../Input/index";
import { FaPlus } from "react-icons/fa";
import Button from "../ButtonPopUp/index";
import * as tf from "@tensorflow/tfjs-core";
import * as tf_2 from "@tensorflow/tfjs";
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
    this.scale=config.scale
  }
  call(input){
    return tf_2.tidy(()=>{
    //   console.log("SCALE ",this)
    // console.log("SCALE Antes",JSON.stringify(input[0].arraySync()))
    // console.log("SCALE Despues",input[0].mul(this.scale).dataSync())
      return input[0].mul(this.scale)
      // return tf_2.math.l2_normalize(input,-1,1e-12,this.name)
    })
  }
  getConfig() {
    const config = super.getConfig();
    Object.assign(config, {scale: this.scale});
    return config;
  }
}

class l2Norm extends tf_2.layers.Layer {
  static className = "l2Norm";
  constructor(config) {
    super(config);

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
    }
    setPreview(URL.createObjectURL(files[0]));
  };
 
  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Enter Emotion Name",
      name: "emotion name",
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
    setModel2(await tf_2.loadLayersModel('http://localhost:8887/model.json'))
    // setModel2(await tf_2.loadLayersModel(process.env.REACT_APP_MODEL_AWS));
    console.log("TERMINADO");
    }catch(error){
      setErrorMessage('Oops! It seems something went wrong when loading the model. Please clear your cache and try again. Sorry for the inconvinience.')
 
    }
  };

  const setError = (input, index, error) => {
    if (input) {
      let fields = inputFields;
      fields[index].error = error;
      setInputFields(fields);
    }
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
              Close
            </h3></div>
        <div className="pop-up-content">
          <h4>New Emotion</h4>

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
              <p>
                Full service creative agency Full service creative agency Full
                service creative agency Full Full service creative{" "}
              </p>
              <canvas
                style={{ background: "pink", visibility: "hidden" }}
                id={`output-upload-detail`}
              ></canvas>
            </div>
          </div>
          <Button
            title={"Add Emotion."}
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
                var arrayString = JSON.stringify(auxEmbedding);
                auxEmbedding = JSON.parse(arrayString);

                let aux = [];

                for (let j = 0; j < 16; j++) {
                  aux.push(auxEmbedding[0][j]);
                }

                let auxItem = {
                  img: images[i].image,
                  embedding: aux,
                };
                auxArray.push(auxItem);
              }
              setSubmitted(false);
              dispatch(
                addEmotionRequest({
                  emotion: inputFields[0].value,
                  company: _id,
                  embeddings: auxArray,
                })
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ChooseEmotionPopUp;
