import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";

import VideoItem from "../components/VideoItem/index";
import Button from "../components/Button/index";
import polar from '../assets/images/Polar.png'
import "../styles/pages/__pages-dir.scss";
const BrandDetail = (props) => {
  console.log(window.location.pathname)
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
    console.log("click");
  };

  const changeInput=(name,event)=>{
   
    let fields= inputFields;
    var item = inputFields.find(function(input, index) {
 
      if(input.name == name )
     
        fields[index].value=event
        console.log("entre",event)
        console.log("entre",fields[index].value)
        setInputFields(fields)
    });

  }

  const [inputFields, setInputFields] = useState([
    {
      name: "The Polar Bowl",
      image: "company name",
    },
    {
      name: "The Polar Bowl",
      image: "company name",
    },
    {
      name: "The Polar Bowl",
      image: "company name",
    },
    {
      name: "The Polar Bowl",
      image: "company name",
    },
  ]);

  return (
    <>
      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />

      <div className="app-videos">
        <h1 className="subtitle" style={{ marginTop: "0px",marginBottom:"60px",color:"white" }}>
          Coca Cola.
        </h1>
        <div className="videos-container">
   <VideoItem image={polar}/>
   <VideoItem image={polar}/>
   <VideoItem image={polar}/>
   <VideoItem image={polar}/>
   <VideoItem image={polar}/>
        </div>
       
      </div>
    </>
  );
};

export default BrandDetail;
