import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Circle from "../components/Circle/index";
import CircularText from "../components/CircularText/index";
import Item from "../components/Item/index";

import adidasLogo from '../assets/images/adidas.png'
import benefitLogo from '../assets/images/benefit.png'
import cocaColaLogo from '../assets/images/cocaCola.png'
import lorealLogo from '../assets/images/loreal.png'
import neutrogenaLogo from '../assets/images/neutrogena.png'
import nikeLogo from '../assets/images/nike.png'

import "../styles/pages/__pages-dir.scss";
const Home = (props) => {
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
        <CircularText text="FULL SERVICE DIGITAL" position="absolute" color="#A9B18F"top="-95%" left="-70%" objectSize={window.innerWidth*2} zIndex="0" font={'155px'} spacing={40} offset={350} />
        <Circle />
        <div className="app-home">
        <div className="section">
          <h2 className="home-title-vertical">Full service creative agency</h2>
          <h1 className="home-title">We build brands of the future</h1>
        </div>
        <div
          className="section"
          style={{
            display: "flex",
            flexDirection:"row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
            <div className="medium-circle">
                <div className="medium-circle-center"></div>
            
                <CircularText text="FULL SERVICE DIGITAL" color="white" position="absolute" top="22%" left="20%" objectSize={window.innerWidth*0.26} zIndex="0" font={'50px'} spacing={10} offset={70} />
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
          <h1 className="subtitle">What we do.</h1>
          <h2 className="paragraph">
            Full service creative agency Full service creative agency Full
            service creative agency Full Full service creative agencyservice
            creative agency Full service creative agency Full service creative
            agency Full service creative agency Full service creative agency
            Full service creative agency Full service creative agency. Full
            service creative agency Full service creative agency Full service
            creative agency.
          </h2>
          </div>
        </div>
        <div
          className="section"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
      
          }}
        >
            <h1 className="subtitle2">Our Brands.</h1>
            <div className="brands-container">
                <Item image={adidasLogo}/>
                <Item image={benefitLogo}/>
                <Item image={cocaColaLogo}/>
                <Item image={lorealLogo}/>
                <Item image={neutrogenaLogo}/>
                <Item image={nikeLogo}/>
          
            </div>
            </div>
      </div>

    </>
  );
};

export default Home;
