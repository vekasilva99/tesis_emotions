import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Select from "../components/Select/index";
import Input from "../components/InputWhite/index";
import Button from "../components/Button/index";
import countryList from '../helpers/countries'

import "../styles/pages/__pages-dir.scss";
const SignIn = (props) => {
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
      placeholder: "Enter your email",
      name: "email",
      value: "",
      type: "email",

    },
    {
      placeholder: "Enter your password",
      name: "password",
      value: "",
      type: "password",

    },
  ]);

  

  return (
    <>
  

      <div className="app-no-account">
        <div className="input-container-column">
        {inputFields.map((input)=>
        <Input item={input} changeInput={changeInput}/>)}
        </div>
        <Button title={'Sign In'} position={"left"} top/>
        <div className="link-button" style={{bottom:"20vh"}}><h3>Wanto to watch video without an account?  </h3><h4>Click Here</h4></div>
        <div className="link-button2"style={{bottom:"16vh"}}><h3>Want to create an account?  </h3><h4> Sign Up Here</h4></div>
      </div>
    </>
  );
};

export default SignIn;
