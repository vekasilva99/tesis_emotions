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
  const [showResults, setShowResults] = useState(false);
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
  const testInfo = useSelector((state) => state.stats.testInfo);
  const testImage = useSelector((state) => state.stats.image);

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
    setOpenAdd(true);
  };

  const settingChooseEmotion = () => {
    setChooseEmotion(!chooseEmotion);
  };

  return (
    <>
      <UploadImage
        setShowResults={setShowResults}
        error={error}
        setErrorMessage={setErrorMessage}
        selectedEmotions={selectedEmotions}
        setSelectedEmotions={setSelectedEmotions}
        open={openAdd}
        setOpen={setOpenAdd}
      />
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
        {!showResults ? (
          <>
            <h1
              className="subtitle"
              style={{ color: "black", marginTop: "0px", marginBottom: "40px" }}
            >
              Prueba Nuestro Modelo.
            </h1>
            <div className="step-container">
              <h2>Paso 1</h2>
              <h3>
              Elija algunas de sus emociones existentes para definir el espacio con el que trabajaremos.
              </h3>
            </div>
            <div className="step-container">
              <h2>Paso 2</h2>
              <h3>Sube una imagen.</h3>
            </div>
            <div className="step-container">
              <h2>Paso 3</h2>
              <h3>Observa los resultado.</h3>
            </div>
            <Button
              disable={error ? true : false}
              title={"Empezar."}
              position={"right"}
              event={settingChooseEmotion}
            />
          </>
        ) : (
          <>
            <h1
              className="subtitle"
              style={{ color: "black", marginTop: "0px", marginBottom: "10px" }}
            >
              Resultados.
            </h1>
            <h3 className="explanation">
            La métrica que se muestra es la similitud de coseno entre la imagen que subió y las emociones seleccionadas. Una emoción coincidirá con la imagen si el valor de la similitud es 0,97 o más.
              </h3>
            <div className="test-results-container">
              <div className="test-results-container-1">
                <img
                  className="test-results-image"
                  src={URL.createObjectURL(testImage)}
                />
              </div>
              <div className="test-results-container-2">
                <h2
                  style={{
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                >
                  Tu foto coincide:
                </h2>
                {testInfo.filter(function (test) {
                  return  test.belongsToEmotion === true;
                }).length > 0 ? (
                  <>
                    {testInfo
                      .filter(function (test) {
                        return test.belongsToEmotion === true;
                      })
                      .sort(function (a, b) {
                        return b.sim - a.sim;
                      })
                      .map((test) => {
                        return (
                          <div className={"result-info"}>
                            <h3>
                              {Number((test.sim ).toFixed(3)).toString()}
                            </h3>
                            <h4>{test.name}</h4>
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <h4>Ninguna</h4>
                )}
                <h2
                  style={{
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                >
                  Tu foto no coincide:
                </h2>
                {testInfo.filter(function (test) {
                  return  test.belongsToEmotion === false;
                }).length > 0 ? (
                  <>
                    {testInfo
                      .filter(function (test) {
                        return  test.belongsToEmotion === false;
                      })
                      .sort(function (a, b) {
                        return b.sim - a.sim;
                      })
                      .map((test) => {
                        return (
                          <div className={"result-info"}>
                            <h3>
                              {Number((test.sim ).toFixed(3)).toString()}
                            </h3>
                            <h4>{test.name}</h4>
                          </div>
                        );
                      })}
                  </>
                ) : null}
              </div>
            </div>
            <Button
              disable={error ? true : false}
              title={"Otra vez."}
              position={"right"}
              event={settingChooseEmotion}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TestModel;