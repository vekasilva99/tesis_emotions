import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Circle from "../components/CircleStatistics/index";
import CircularText from "../components/CircularText/index";
import Item from "../components/Item/index";

import adidasLogo from '../assets/images/adidas.png'
import benefitLogo from '../assets/images/benefit.png'
import cocaColaLogo from '../assets/images/cocaCola.png'
import lorealLogo from '../assets/images/loreal.png'
import neutrogenaLogo from '../assets/images/neutrogena.png'
import nikeLogo from '../assets/images/nike.png'
import Button from "../components/Button/index";
import "../styles/pages/__pages-dir.scss";
const VideoStatistics= (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const [videoSmall, setVideoSmall] = useState(false);
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
    console.log("click");
  };

  const settingVideoSmall =()=>{
    setDisplay(true)
    setTimeout(() => {
      setVideoSmall(true)
    }, 10);
   
  }

  return (
    <>

      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
   
      <div className={!videoSmall ? "app-video-statistics-watch":"app-video-statistics-watch large"}>
        <div className="section" >
       
          <h1 className="video-watch-title">The Polar Bowl</h1>
          <div className={videoSmall  ? "video-container-small" :"video-container"}>
            <div style={{background:"purple",width:"100%",height:"100%"}}></div>
          </div>
          <div className={videoSmall  ? "circle-statistics": !display ? "circle-statistics graph-hidden display-none":"circle-statistics graph-hidden"}>
          <Circle />
          <Circle />
          <Circle />
          <Circle />
          <Circle />
          <Circle />
          </div>
          <div className={videoSmall  ? "graphs-left-container": !display ? "graphs-left-container graph-hidden display-none":"graphs-left-container graph-hidden" }>
            <div className="stat-graph"> </div>
            <div className="stat-graph"> </div>
            <div className="stat-graph"> </div>
          </div>
          <div className={videoSmall  ? "graphs-right-container":!display ? "graphs-right-container graph-hidden display-none":"graphs-right-container graph-hidden" }>
            <div className="stat-graph"> </div>
            <div className="stat-graph"> </div>
        
          </div>
        </div>
        
       
        <Button title={'View Statistics.'} position={"right"} hide={videoSmall} event={settingVideoSmall}/>
        </div>

  
    </>
  );
};

export default VideoStatistics;
