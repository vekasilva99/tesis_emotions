import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import ArcText from 'arc-text';
import Item from "../components/EmotionItem/index";
import Button from "../components/Button/index";
import Heading from "../components/Heading/index";
import polar from '../assets/images/Polar.png'
import "../styles/pages/__pages-dir.scss";
import '@webpunk/circular-text';
const HomeCompany = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  // const arcText = new ArcText(document.getElementById('#circle-button-text'));
 
  // // Set the radius to 150 pixels.
  // arcText.arc(150);
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
      placeholder: "Enter company name",
      name: "company name",
      value: "",
      type: "text",

    },
    { placeholder: "Enter email", name: "email", value: "", type: "email" },
    {
      placeholder: "Enter password",
      name: "password",
      value: "",
      type: "password",
    },
    {
      placeholder: "Confirm your password",
      name: "confirm password",
      value: "",
      type: "password",
    },
  ]);

  return (
    <>
      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} color={"#A9B18F"}/>
      <Drawer
      color={"#A9B18F"}
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />

      <div className="app-emotions">
        <h1 className="subtitle" style={{ color:"black",marginTop: "0px",marginBottom:"60px" }}>
          Coca Cola.
        </h1>
        <div className="circle-button">
        <circular-text
    text="ADD EMOTION"
    radius="100">
</circular-text>
        </div>
      
      </div>
    </>
  );
};

export default HomeCompany;
