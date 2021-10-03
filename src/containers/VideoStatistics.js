import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import { useDispatch, useSelector } from "react-redux";
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
import {
  statTotalViewsRequest,
  statTopGenderRequest,
  statTopCountryRequest,
  statTopAgeRequest,
  statPayingAttentionRequest,
  statPredominantEmotionRequest,
} from "../actions/Statistics";
import ChooseEmotions from "../components/ChooseEmotions/index";
import "../styles/pages/__pages-dir.scss";
import { useParams } from "react-router-dom";
import GenderChart from "../components/GenderChart";
import CountryChart from "../components/CountryChart";
import AgeChart from "../components/AgeChart";
import AttentionChart from "../components/AttentionChart";
import EmotionsChart from "../components/EmotionsChart";
const VideoStatistics = (props) => {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const dispatch = useDispatch();
  const { video } = useParams();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [chooseEmotion, setChooseEmotion] = useState(false);
  const [display, setDisplay] = useState(false);
  const [visible, setVisible] = useState(false);
  const [videoSmall, setVideoSmall] = useState(false);
  const { selectedCompany, selectedVideo, loader } = useSelector((state) => ({
    ...state.brands,
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
    dispatch(fetchVideoRequest({ company: _id, video: video }));
  }, []);

  useEffect(() => {
    if (Object.keys(selectedVideo).length > 0 && visible === false) {
      setVisible(true);
    }
  }, [selectedVideo]);

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
      autoplay: 1,
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
    console.log(aux);
  };

  return (
    <>
      <ChooseEmotions
        settingChooseEmotion={settingChooseEmotion}
        open={chooseEmotion}
        videoSmall={settingVideoSmall}
        selectedEmotions={selectedEmotions}
        addEmotion={addEmotion}
      />

      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
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
        <div className="section-statistics">
          <h1 className="video-watch-title">The Polar Bowl</h1>
          <div
            className={
              videoSmall
                ? "video-container-statistics-small"
                : "video-container-statistics"
            }
          >
            {visible && selectedVideo != {} ? (
              <div
                style={{ background: "purple", width: "100%", height: "100%" }}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  <YouTube
                    videoId={YouTubeGetID(selectedVideo.link)}
                    opts={opts}
                  />
                </div>
              </div>
            ) : null}
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
                title={"Predominant Emotion"}
                data={
                  predominantEmotion.count > 0
                    ? predominantEmotion.name
                    : "None"
                }
              />
            )}
            {totalViews != null && (
              <Circle
                title={totalViews === 1 ? "View" : "Views"}
                data={totalViews.toString()}
              />
            )}
            {Object.keys(payingAttention).length > 0 && (
              <Circle
                title={payingAttention.message}
                data={payingAttention.value.toString() + "%"}
              />
            )}
            {Object.keys(topGender).length > 0 && (
              <Circle title={"GENDER WITH MOST VIEWS"} data={topGender._id} />
            )}
            {Object.keys(topCountry).length > 0 && (
              <Circle title={"COUNTRY WITH MOST VIEWS"} data={topCountry._id} />
            )}
            {Object.keys(topAges).length > 0 && (
              <Circle title={"AGE GROUP WITH MOST VIEWS"} data={topAges._id} />
            )}
          </div>
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
        </div>

        <Button
          title={"View Statistics."}
          position={"right"}
          hide={videoSmall}
          event={settingChooseEmotion}
        />
      </div>
    </>
  );
};

export default VideoStatistics;
