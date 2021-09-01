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
const VideoDetail = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
    console.log("click");
  };

  return (
    <>
    <div style={{width:"100%",height:"100vh",overflow:"hidden"}}>
      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
      <CircularText text="FULL SERVICE DIGITAL" position="relative"  color="#A9B18F"top="-95%" left="-70%" objectSize={window.innerWidth*2} zIndex="0" font={'155px'} spacing={40} offset={350} />
      <Circle />
      <div className="app-video-detail">
        <div className="section">
          <h2 className="home-title-vertical">By Coca Cola</h2>
          <h1 className="video-title">The Polar Bowl</h1>
        </div>
       
       
      </div>
      <Button title={'Watch Now.'} position={"right"}/>
      </div>
    </>
  );
};

export default VideoDetail;
