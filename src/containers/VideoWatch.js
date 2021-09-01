import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Circle from "../components/CircleImage/index";
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
const VideoWatch = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
    console.log("click");
  };

  return (
    <>

      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
   
      <div className="app-video-detail-watch">
        <div className="section" >
       
          <h1 className="video-watch-title">The Polar Bowl</h1>
          <div className="video-container">
            <div style={{background:"purple",width:"100%",height:"100%"}}></div>
          </div>
        </div>
       
        </div>

  
    </>
  );
};

export default VideoWatch;
