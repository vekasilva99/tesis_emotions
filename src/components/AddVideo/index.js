import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";
import polar from "../../assets/images/Polar.png";
import Button from "../ButtonPopUp/index";
import Input from "../Input/index";
const ChooseEmotionPopUp = ({ settingChooseEmotion,open,videoSmall }) => {

  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Enter Video Name",
      name: "video name",
      value: "",
      type: "text",

    },
    {
      placeholder: "Enter Video Link",
      name: "video link",
      value: "",
      type: "text",

    },
    {
      placeholder: "Enter Video Duration",
      name: "video duration",
      value: "",
      type: "number",

    },

  ]);


  const changeInput=(name,event)=>{
   
    let fields= inputFields;
    var item = inputFields.find(function(input, index) {
 
      if(input.name == name )
     
        fields[index].value=event
  
        setInputFields(fields)
    });

  }

  return (
    <div className={open ? "pop-up-container":"pop-up-container closed"}>
      <div className="pop-up-content">
        <h4>New Video</h4>
        <div className="pop-up-input-container">
        {inputFields.map((input)=>
        <Input item={input} changeInput={changeInput}/>)}
        </div>
        <Button title={"Add Video."} position={"right"} event={()=>{videoSmall();settingChooseEmotion()}}/>
      </div>
    </div>
  );
};

export default ChooseEmotionPopUp;
