import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Select from "../components/Select/index";
import Input from "../components/InputWhite/index";
import Button from "../components/Button/index";
import countryList from '../helpers/countries'

import "../styles/pages/__pages-dir.scss";
const SignUp = (props) => {
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
      placeholder: "Enter your birthdate",
      name: "birthdate",
      value: "",
      type: "text",

    },
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
    {
      placeholder: "Confirm your password",
      name: "confirm password",
      value: "",
      type: "password",

    },
  ]);

  const [selectFields, setSelectFields] = useState([
    {
      placeholder: "Choose your gender",
      name: "gender",
      selected: "",
      type:"text",
      options: [{value:"Male",name:"Male"},{value:"Female",name:"Female"},{value:"Other",name:"Other"}],

    },
    {
        placeholder: "Choose your country",
        name: "country",
        selected: "",
        type:"text",
        options: countryList,
  
      },
  ]);

  return (
    <>
  

      <div className="app-no-account">
        <div className="input-container-column">
        {selectFields.map((input)=>
        <Select item={input} changeInput={changeInput}/>)}
        {inputFields.map((input)=>
        <Input item={input} changeInput={changeInput}/>)}
        </div>
        <Button title={'Sign Up'} position={"left"} />
        <div className="link-button"><h3>Already have an account? </h3><h4> Sign In Here</h4></div>
        <div className="link-button2"><h3>Want to create an account?  </h3><h4> Sign Up Here</h4></div>
      </div>
    </>
  );
};

export default SignUp;
