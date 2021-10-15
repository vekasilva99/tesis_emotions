import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Circle from "../components/CircleImage/index";
import CircularText from "../components/CircularText/index";
import Item from "../components/Item/index";
import { useParams } from "react-router-dom";
import adidasLogo from "../assets/images/adidas.png";
import benefitLogo from "../assets/images/benefit.png";
import cocaColaLogo from "../assets/images/cocaCola.png";
import lorealLogo from "../assets/images/loreal.png";
import neutrogenaLogo from "../assets/images/neutrogena.png";
import nikeLogo from "../assets/images/nike.png";
import Button from "../components/Button/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoRequest } from "../actions/Brands";
import NotExistPopUp from "../components/VideoNotExist";
import Instructions from "../components/Instructions";
import { getMean,getSTD} from '../helpers/Model/methods'
import "../styles/pages/__pages-dir.scss";
const VideoDetail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [instruction, setInstruction] = useState(false);
  const { token, _id, role } = useSelector((state) => ({
    ...state.auth,
  }));
  const { id, videoId } = useParams();
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const { selectedCompany, selectedVideo, loader } = useSelector((state) => ({
    ...state.brands,
  }));
  useEffect(() => {
    dispatch(fetchVideoRequest({ company: id, video: videoId }));
  }, []);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 600);
    }
  }, []);

  const watchVideo = () => {
    if (token && role) {
      history.push(`/brand/${id}/${videoId}/watch`);
    } else {
      history.push(`/watchvideo/${id}/${videoId}`);
    }
  };
  const openInstructions = () => {
 
    setInstruction(true)
  
  };

  return (
    <>

    <Instructions watchVideo={watchVideo} instruction={instruction} setInstruction={setInstruction}/>
      <div
        style={{
          width: "100%",
          height: "100vh",
          overflow: "hidden !important",
          maxHeight: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <NotExistPopUp/>
        <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
        <Drawer
          sideDrawerOpen={sideDrawerOpen}
          drawerToggleClickHandler={drawerToggleClickHandler}
        />
        <>
          {selectedCompany && selectedVideo ? (
            <>
              <div className="home-big-circle">
                <circular-text
                  text="Full service creative agency  Full service creative agency   "
                  radius={(window.innerWidth * 0.7).toString()}
                ></circular-text>
              </div>

              <Circle image={selectedVideo.mainImg} />
              <div
                className={
                  visible ? "app-video-detail" : "app-video-detail-onload"
                }
              >
                <div className="section-title">
                  <h2 className="home-title-vertical2">
                    Por {selectedCompany.full_name}
                  </h2>
                  <h1 className="video-title2">{selectedVideo.name}</h1>
                </div>

              </div>
              <Button
                event={openInstructions}
                title={"Ver Ahora."}
                position={"right"}
              />
            </>
          ) : null}
        </>
      </div>
    </>
  );
};

export default VideoDetail;
