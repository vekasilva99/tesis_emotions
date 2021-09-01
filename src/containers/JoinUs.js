import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";

import Input from "../components/Input/index";
import Button from "../components/Button/index";

import "../styles/pages/__pages-dir.scss";
const JoinUs = (props) => {
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
      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />

      <div className="app-join">
        <h1 className="subtitle" style={{ marginTop: "0px",marginBottom:"60px" }}>
          Join Us.
        </h1>
        <div className="input-container" >
        {inputFields.map((input)=>
        <Input item={input} changeInput={changeInput}/>)}
        </div>
        <Button title={'Join Now.'} position={"right"}/>
      </div>
    </>
  );
};

export default JoinUs;
