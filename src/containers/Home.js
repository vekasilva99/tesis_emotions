import React, { useEffect, useState } from "react";
import  Sidebar  from '../components/Sidebar/index'
import  Drawer  from '../components/Drawer/index'
import  Circle  from '../components/Circle/index'
import "../styles/pages/__pages-dir.scss";
const Home = (props) => {
const [sideDrawerOpen,setSideDrawerOpen] =useState(false)

const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen)
    console.log("click")
  }

  return (
      <>
              <Sidebar drawerToggleClickHandler={drawerToggleClickHandler}/>
        <Drawer sideDrawerOpen={sideDrawerOpen} drawerToggleClickHandler={drawerToggleClickHandler}/>
    <div className="app-home">
        <h1 className="home-title">We build brands of the future</h1>

        <Circle/>
    </div>
    
    </>
  );
};

export default Home;
