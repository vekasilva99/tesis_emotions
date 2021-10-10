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

const TestModel = ({}) => {
  const dispatch = useDispatch();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [chooseEmotion, setChooseEmotion] = useState(false);
  const [videoSmall, setVideoSmall] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [display, setDisplay] = useState(false);
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


  const addEmotion = (id) => {
    let aux = selectedEmotions;
    if (!aux.includes(id)) {
      aux.push(id);
    } else {
      aux = aux.filter((element) => {
        return element != id;
      });
    }
    setSelectedEmotions(aux);
    console.log(aux);
  };


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

  const settingVideoSmall = () => {
    setDisplay(true);
    setOpenAdd(true)
  };

  const settingChooseEmotion = () => {
    setChooseEmotion(!chooseEmotion);
  };
  return (
    <>
      <UploadImage error={error} setErrorMessage={setErrorMessage} selectedEmotions={selectedEmotions} open={openAdd} setOpen={setOpenAdd} />
           <ChooseEmotions
        settingChooseEmotion={settingChooseEmotion}
        open={chooseEmotion}
        setOpen={setChooseEmotion}
        videoSmall={settingVideoSmall}
        selectedEmotions={selectedEmotions}
        addEmotion={addEmotion}
      />
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
        <h1
          className="subtitle"
          style={{ color: "black", marginTop: "0px", marginBottom: "40px" }}
        >
          Test Our Model.
        </h1>
        <div className="step-container">
        <h2>Step 1</h2>
        <h3>Choose some of your existing emotions to define the space we'll work with.</h3>
        </div>
        <div className="step-container">
        <h2>Step 2</h2>
        <h3>Upload an image.</h3>
        </div>
        <div className="step-container">
        <h2>Step 3</h2>
        <h3>See the results.</h3>
        </div>
        <Button
         disable={error ? true :false}
            title={"Start."}
            position={"right"}
            event={settingChooseEmotion}
          />
       
      </div>
    </>
  );
};

export default TestModel;
