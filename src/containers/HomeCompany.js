import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import "@webpunk/circular-text";

const HomeCompany = (props) => {
  const dispatch = useDispatch();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const { _id } = useSelector((state) => ({
    ...state.auth,
  }));
  const state = useSelector((state) => ({
    ...state.auth,
  }));
  const name = useSelector((state) => ({ ...state.auth })).full_name;
  const emotions = useSelector((state) => ({ ...state.company })).emotions;
  const videos = useSelector((state) => ({ ...state.brands })).videos;

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const changeInput = (name, event) => {
    let fields = inputFields;
    var item = inputFields.find(function (input, index) {
      if (input.name == name) fields[index].value = event;

      setInputFields(fields);
    });
  };

  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Enter company name",
      name: "company name",
      value: "",
      type: "text",
    },
    { placeholder: "Enter email", name: "email", value: "", type: "email" },
    {
      placeholder: "Enter password",
      name: "password",
      value: "",
      type: "password",
    },
    {
      placeholder: "Confirm your password",
      name: "confirm password",
      value: "",
      type: "password",
    },
  ]);
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

  return (
    <>
      <AddEmotionPopUp error={error} setErrorMessage={setErrorMessage}open={openAdd} setOpen={setOpenAdd} />
      <AddVideoPopUp open={openVideo} setOpen={setOpenVideo} />
      <Sidebar
        drawerToggleClickHandler={drawerToggleClickHandler}
        color={"#A9B18F"}
      />
      <Drawer
        color={"#A9B18F"}
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />

      <div className="app-emotions">
        <h1
          className="subtitle"
          style={{ color: "black", marginTop: "0px", marginBottom: "60px" }}
        >
          {name}.
        </h1>

        <div
          className={
            emotions.length === 0 && videos.length === 0
              ? "button-home-container-big"
              : "button-home-container"
          }
        >
          <div
            className={
              emotions.length === 0 && videos.length === 0
                ? error===null ? "circle-button-big" :"circle-button-big disable"
                : error===null ? "circle-button" :"circle-button disable"
            }
            onClick={() => {
              if(error===null){
              setOpenAdd(true);
              }
            }}
          >
            <circular-text
              text="AGREGAR EMOCIÓN   "
              radius={
                emotions.length === 0 && videos.length === 0 ? "230" : "100"
              }
            ></circular-text>
            <div className="icon-container-button">
              <BiHappy className="button-icon-home" />
            </div>
          </div>
          <div
            className={
              emotions.length === 0 && videos.length === 0
                ? "circle-button-big"
                : "circle-button"
            }
            onClick={() => {
              setOpenVideo(true);
            }}
          >
            <circular-text
              text="AGREGAR VIDEO   "
              radius={
                emotions.length === 0 && videos.length === 0 ? "230" : "100"
              }
            ></circular-text>
            <div className="icon-container-button">
              <FaVideo className="button-icon-home" />
            </div>
          </div>
        </div>
        {emotions.length > 0 ? (
          <div className="emotions-home-section">
            <h1>Emociones</h1>

            <div className="emotions-home-container">
              {emotions.map((emotion) => {
                return <Item emotion={emotion} />;
              })}
            </div>
          </div>
        ) : null}
        {videos.length > 0 ? (
          <div className="emotions-home-section" style={{ marginTop: "60px" }}>
            <h1>Videos</h1>

            <div className="videos-home-container">
              {videos.slice(0, 6).map((video) => {
                return <Circle video={video} />;
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default HomeCompany;
