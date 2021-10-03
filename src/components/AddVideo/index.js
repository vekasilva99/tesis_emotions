import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/__components-dir.scss";
import polar from "../../assets/images/Polar.png";
import Button from "../ButtonPopUp/index";
import Input from "../Input/index";
import { FaPlus } from "react-icons/fa";
import DurationPicker from "react-duration-picker";
import validator from "validator";
import { addVideoRequest } from "../../actions";
import ErrorPopUp from "../../components/ErrorPopUp/index";
import SuccessPopUp from "../../components/SuccessPopUp/index";
import { signUpUserRequest } from "../../actions/SignUp";
import { notLoading } from "../../actions/Loader";
import { YouTubeGetID } from "../../helpers/Model/methods";
import YouTube from "react-youtube";
import CircularProgress from "@material-ui/core/CircularProgress";

const AddVideoPopUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [duration, setDuration] = useState(null);
  const [youtubeID, setYoutubeID] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const successCompany = useSelector((state) => ({ ...state.company.success }));
  const { _id } = useSelector((state) => ({
    ...state.auth,
  }));
  const errors = useSelector((state) => ({ ...state.company.error }));
  const loader = useSelector((state) => ({ ...state.company })).loaderCompany;

  const validateYouTubeUrl = (urlToParse) => {
    if (urlToParse) {
      var regExp = new RegExp(
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      );
      if (urlToParse.match(regExp)) {
        return true;
      }
    }
    return false;
  };
  const opts = {
    height: (window.innerHeight * 0.7).toString(),
    width: (window.innerWidth * 0.7).toString(),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      disablek: 1,
    },
  };
  const uploadImage = (files) => {
    setImage(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  };

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setSubmitted(false);
        dispatch(notLoading());
      }, 1800);
    }
  }, [loader]);

  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Enter Video Name",
      name: "video name",
      value: "",
      type: "text",
      error: "",
    },
    {
      placeholder: "Enter Video Link",
      name: "video link",
      value: "",
      type: "text",
      error: "",
    },
  ]);

  const changeInput = (name, event) => {
    let fields = inputFields;
    var item = inputFields.find(function (input, index) {
      if (input.name == name) fields[index].value = event;

      if (name === "video link") {
        if (validateYouTubeUrl(event)) {
          setYoutubeID(YouTubeGetID(event));
        }
      }

      setInputFields(fields);
    });
  };
  useEffect(() => {
    if (Object.keys(successCompany).length > 0 && open === true) {
      inputFields[0].value = "";
      inputFields[1].value = "";
      setDuration(null);
      setImage(null);
      inputFields[0].error = "";
      inputFields[1].error = "";
      setOpen(false);
    }
  }, [successCompany]);

  const setError = (input, index, error) => {
    if (input) {
      let fields = inputFields;
      fields[index].error = error;
      setInputFields(fields);
    }
  };

  const onChangePicker = (d) => {
    setDuration(d);
  };

  const onSubmit = () => {
    setSubmitted(true);
    let emptyField = false;
    let error = false;

    if (inputFields[0].value === "") {
      setError(true, 0, "Required Field");
      emptyField = true;
    }
    if (inputFields[1].value === "") {
      setError(true, 1, "Required Field");
      emptyField = true;
    }
    if (duration === null) {
      // setError(true, 2, "Required Field");
      emptyField = true;
    }
    if (image === null) {
      // setError(true, 3, "Required Field");
      emptyField = true;
    }
    if (!validateYouTubeUrl(inputFields[1].value)) {
      error = true;
    }
    if (validateYouTubeUrl(inputFields[1].value) && duration > 240) {
      error = true;
    }

    if (!error && !emptyField) {
      let payload = {
        name: inputFields[0].value,
        companyID: _id,
        mainImg: image,
        duration:
          duration.hours * 3600 + duration.minutes * 60 + duration.seconds,
        link: inputFields[1].value,
        active: true,
      };

      dispatch(addVideoRequest(payload));
    } else {
      setTimeout(() => {
        setSubmitted(false);
      }, 1200);
    }
  };

  const onReady2 = (event) => {
    setDuration(event.target.getDuration());
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
      <ErrorPopUp company={true} inputs={inputFields} />
      <SuccessPopUp company={true} inputs={inputFields} />
      <div className={open ? "pop-up-container" : "pop-up-container closed"}>
        <div className="pop-up-content">
          <h4>New Video</h4>
          <div className="pop-up-input-container">
            {inputFields.map((input, index) => (
              <Input
                index={index}
                changeError={setError}
                setSubmitted={setSubmitted}
                submitted={submitted}
                item={input}
                changeInput={changeInput}
              />
            ))}

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2 className="placeholder">Video Image</h2>
              <label
                style={{
                  marginBottom: "5px",
                  marginTop: "0px",
                  marginLeft: "20px",
                }}
                className="upload-button-3"
              >
                <input
                  style={{ visibility: "hidden" }}
                  onChange={(event) => {
                    uploadImage(event.target.files);
                  }}
                  type="file"
                  accept="image/*"
                  multiple={false}
                />

                {image === null ? (
                  <FaPlus className="upload-button-icon-3" />
                ) : (
                  <img
                    className="upload-button-image-2"
                    src={URL.createObjectURL(image)}
                  />
                )}
              </label>
            </div>
            {youtubeID ? (
              <div style={{ display: "none" }}>
                <YouTube videoId={youtubeID} opts={opts} onReady={onReady2} />
              </div>
            ) : null}
          </div>

          <Button
            event={() => {
              onSubmit();
            }}
            title={"Add Video."}
            position={"right"}
          />
        </div>
      </div>
    </>
  );
};

export default AddVideoPopUp;
