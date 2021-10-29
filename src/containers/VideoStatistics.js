import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import Circle from "../components/CircleStatistics/index";
import CircularText from "../components/CircularText/index";
import Item from "../components/Item/index";
import YouTube from "react-youtube";
import adidasLogo from "../assets/images/adidas.png";
import benefitLogo from "../assets/images/benefit.png";
import cocaColaLogo from "../assets/images/cocaCola.png";
import lorealLogo from "../assets/images/loreal.png";
import neutrogenaLogo from "../assets/images/neutrogena.png";
import nikeLogo from "../assets/images/nike.png";
import Button from "../components/Button/index";
import AddVideo from "../components/AddVideo/index";
import AddEmotion from "../components/AddEmotion/index";
import { YouTubeGetID } from "../helpers/Model/methods";
import { fetchVideoRequest } from "../actions/Brands";
import { disableVideoRequest,fetchEmotionsRequest } from "../actions/Company";
import {
  statTotalViewsRequest,
  statTopGenderRequest,
  statTopCountryRequest,
  statTopAgeRequest,
  statPayingAttentionRequest,
  statPredominantEmotionRequest,
} from "../actions/Statistics";
import ChooseEmotions from "../components/ChooseEmotions/index";
import ErrorPopUpModel from '../components/ErrorPopUpModel'
import "../styles/pages/__pages-dir.scss";
import { useParams } from "react-router-dom";
import GenderChart from "../components/GenderChart";
import CountryChart from "../components/CountryChart";
import AgeChart from "../components/AgeChart";
import AttentionChart from "../components/AttentionChart";
import EmotionsChart from "../components/EmotionsChart";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotExistPopUp from "../components/VideoNotExist";
import {BiHide,BiShow} from 'react-icons/bi'
const VideoStatistics = (props) => {
  const history = useHistory();
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [chooseEmotion, setChooseEmotion] = useState(false);
  const [videoSmall, setVideoSmall] = useState(false);
  const dispatch = useDispatch();
  const { video } = useParams();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [display, setDisplay] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(true);

<<<<<<< HEAD
  const { selectedCompany, selectedVideo,error  } = useSelector((state) => ({
=======
  const { selectedCompany, selectedVideo,error,loaderCompany  } = useSelector((state) => ({
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
    ...state.brands,
  }));
  const { emotions } = useSelector((state) => ({
    ...state.company,
  }));
  const state= useSelector((state) => ({
    ...state.stats,
  }));

  const {
    totalViews,
    topGender,
    topCountry,
    topAges,
    payingAttention,
    predominantEmotion,
  } = useSelector((state) => ({
    ...state.stats,
  }));
  useEffect(() => {
    dispatch(fetchVideoRequest({ company: _id, video: video,history:history }));
  }, []);
  useEffect(() => {
  
  }, [error]);

  useEffect(() => {
    if (Object.keys(selectedVideo).length > 0 && visible === false) {
      setVisible(true);
    }
  }, [selectedVideo]);
  useEffect(() => {
    dispatch(fetchEmotionsRequest());
  }, []);
<<<<<<< HEAD
=======
  useEffect(() => {
    if(loaderCompany==false){
      setLoader(false)
    }
  }, [loaderCompany]);
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf

  useEffect(() => {
    const timer = setTimeout(function () {
      console.log("ENTRE ACA",emotions,errorMessage)
<<<<<<< HEAD
      if (emotions.length===0 && errorMessage===null) {
        setErrorMessage(
          "It looks like your company has not defined any emotions. In order to see this video's statistics you need to define at least one."
=======
      if (emotions.length===0 && errorMessage===null && loader===false && loaderCompany) {
        setErrorMessage(
          "Parece que su empresa no ha definido ninguna emoción. Para ver las estadísticas de este video, debes definir al menos una."
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
        );
      
      }
    }, 100);
    return () => clearTimeout(timer);
  });
  useEffect(() => {
    dispatch(statTotalViewsRequest(video));
  }, []);

  useEffect(() => {
    dispatch(statPayingAttentionRequest(video));
  }, []);
  useEffect(() => {
    dispatch(statTopAgeRequest(video));
  }, []);
  useEffect(() => {
    dispatch(statTopGenderRequest(video));
  }, []);
  useEffect(() => {
    dispatch(statTopCountryRequest(video));
  }, []);
  const { _id } = useSelector((state) => ({
    ...state.auth,
  }));

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const settingVideoSmall = () => {
    setDisplay(true);
    setTimeout(() => {
      setVideoSmall(true);
    }, 10);
  };

  const settingChooseEmotion = () => {
    setChooseEmotion(!chooseEmotion);
  };

  const opts = {
    height: !videoSmall
      ? (window.innerHeight * 0.7).toString()
      : (window.innerHeight * 0.4).toString(),
    width: !videoSmall
      ? (window.innerWidth * 0.8).toString()
      : (window.innerWidth * 0.35).toString(),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
<<<<<<< HEAD
      autoplay: 1,
=======
      autoplay: 0,
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      controls: 0,
      modestbranding: 1,
      disablek: 1,
    },
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

  };
  const onReady = (event) => {
    setLoader(false)
  };
<<<<<<< HEAD
=======
  const { emotionsInVideo,loaderStatistics } = useSelector((state) => ({
    ...state.stats,
  }));
 
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf

  return (
    <>
    <NotExistPopUp />
      <ChooseEmotions
        settingChooseEmotion={settingChooseEmotion}
        open={chooseEmotion}
        setOpen={setChooseEmotion}
        videoSmall={settingVideoSmall}
        selectedEmotions={selectedEmotions}
        addEmotion={addEmotion}
      />
      <ErrorPopUpModel error={errorMessage} setError={setErrorMessage} />
      <Sidebar color={"#A9B18F"} drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
      color={"#A9B18F"}
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />

      <div
        className={
          !videoSmall
            ? "app-video-statistics-watch"
            : "app-video-statistics-watch large"
        }
      >
<<<<<<< HEAD
        <div className="section-statistics">
=======
        <div className="section-statistics" style={{height:emotionsInVideo.length > 0 ? "215vh" :"110vh"}}>
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          <div style={{ width:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
          <h1 className="video-stat-title">{selectedVideo.name}</h1>
         {selectedVideo != {} ?
         <>
         {selectedVideo.active ?
          <BiHide className="disable-video" onClick={()=>{
            let auxVideo=selectedVideo
            auxVideo.active=false
            dispatch(disableVideoRequest(auxVideo))
          }} />
          :  <BiShow className="disable-video" onClick={()=>{
            let auxVideo=selectedVideo
            auxVideo.active=true
            dispatch(disableVideoRequest(auxVideo))
          }}/>}
          </>
      :null}
          </div>
          <div
            className={
              videoSmall
                ? "video-container-statistics-small"
                : "video-container-statistics"
            }
          >
            {visible && selectedVideo != {} ? (
              <div
                style={{ width: "100%", height: "100%" }}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  <YouTube
                    videoId={YouTubeGetID(selectedVideo.link)}
                    opts={opts}
                    onReady={onReady}
                  />

                </div>
              </div>
            ) :  <CircularProgress size={100} thickness={5} />}
          </div>

          <div
            className={
              videoSmall
                ? "circle-statistics"
                : !display
                ? "circle-statistics graph-hidden display-none"
                : "circle-statistics graph-hidden"
            }
          >
            {Object.keys(predominantEmotion).length > 0 && (
              <Circle
<<<<<<< HEAD
                title={"Predominant Emotion"}
                data={
                  predominantEmotion.count > 0
                    ? predominantEmotion.name
                    : "None"
=======
                title={"Emoción Predominante"}
                data={
                  predominantEmotion.count > 0
                    ? predominantEmotion.name
                    : "Ninguna"
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
                }
              />
            )}
            {totalViews != null && (
              <Circle
<<<<<<< HEAD
                title={totalViews === 1 ? "View" : "Views"}
=======
                title={totalViews === 1 ? "Vista" : "Vistas"}
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
                data={totalViews.toString()}
              />
            )}
            {Object.keys(payingAttention).length > 0 && (
              <Circle
                title={payingAttention.message}
<<<<<<< HEAD
                data={payingAttention.value.toString() != "Nobody" ? payingAttention.value.toString()+"%" :payingAttention.value.toString()}
              />
            )}
            {Object.keys(topGender).length > 0 ? (
              <Circle title={"GENDER WITH MOST VIEWS"} data={topGender._id} />
            ): <Circle title={"GENDER WITH MOST VIEWS"} data={"None"} />}
            {Object.keys(topCountry).length > 0 ? (
              <Circle title={"COUNTRY WITH MOST VIEWS"} data={topCountry._id} />
            ):   <Circle title={"COUNTRY WITH MOST VIEWS"} data={"None"} />}
            {Object.keys(topAges).length > 0 ? (
              <Circle title={"AGE GROUP WITH MOST VIEWS"} data={topAges._id} />
            ):   <Circle title={"AGE GROUP WITH MOST VIEWS"} data={"None"} />}
=======
                data={payingAttention.value.toString() != "Nadie" ? payingAttention.value.toString()+"%" :payingAttention.value.toString()}
              />
            )}
            {Object.keys(topGender).length > 0 ? (
              <Circle title={"GENERO CON MAS VISTAS"} data={topGender._id} />
            ): <Circle title={"GENERO CON MAS VISTAS"} data={"Ninguno"} />}
            {Object.keys(topCountry).length > 0 ? (
              <Circle title={"PAÍS CON MAS VISTAS"} data={topCountry._id} />
            ):   <Circle title={"PAÍS CON MAS VISTAS"} data={"Ninguno"} />}
            {Object.keys(topAges).length > 0 ? (
              <Circle title={"GRUPO ETARIO CON MAS VISTAS"} data={topAges._id} />
            ):   <Circle title={"GRUPO ETARIO CON MAS VISTAS"} data={"Ninguno"} />}
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          </div>
          {totalViews >0 ?
          <>
          <div
            className={
              videoSmall
                ? "graphs-left-container"
                : !display
                ? "graphs-left-container graph-hidden display-none"
                : "graphs-left-container graph-hidden"
            }
          >
            <div className="stat-graph">
              <EmotionsChart selectedEmotions={selectedEmotions} />{" "}
            </div>
            <div className="stat-graph">
              <GenderChart />{" "}
            </div>
            <div className="stat-graph">
              {" "}
              <CountryChart />
            </div>
          </div>
          <div
            className={
              videoSmall
                ? "graphs-right-container"
                : !display
                ? "graphs-right-container graph-hidden display-none"
                : "graphs-right-container graph-hidden"
            }
          >
            <div className="stat-graph">
              {" "}
              <AttentionChart />
            </div>
            <div className="stat-graph">
              <AgeChart />{" "}
            </div>
          </div>
          </>
        :null}
        </div>
       

        <Button
        disable={emotions.length===0 ? true:false}
<<<<<<< HEAD
          title={"View Statistics."}
=======
          title={"Ver Estadisticas."}
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          position={"right"}
          hide={videoSmall}
          event={settingChooseEmotion}
        />
      </div>
    </>
  );
};

<<<<<<< HEAD
export default VideoStatistics;
=======
export default VideoStatistics;
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
