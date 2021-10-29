import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";
import polar from "../../assets/images/Polar.png";
import Item from "./item";
import Input from "../Input/index";
import {FaPlus}  from 'react-icons/fa';
import Button from "../ButtonPopUp/index";
const ChooseEmotionPopUp = ({ settingChooseEmotion, open, videoSmall }) => {
  const [images, setImages]=useState([{image:null},{image:null},{image:null},{image:null},{image:null},{image:null},{image:null},{image:null},{image:null},{image:null}])
const [preview,setPreview]=useState(null)

  const uploadImages =(files,index)=>{
  

    let auxImages=images;
    let auxFiles =images.filter((image => image.image===null)) 
      if(auxFiles.length>0 && files.length<=10){
for(let j=0;j<files.length;j++){
    for(var i = 0; i < auxImages.length; i++) {
      if (auxImages[i].image == null) {
        auxImages[i].image=files[j]
        break
      }
  }
      }
    }
    setPreview(URL.createObjectURL(files[0]))
    console.log(auxImages)
  }

  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Enter Emotion Name",
      name: "emotion name",
      value: "",
      type: "text",

    },

  ]);

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
  return (
    <div className={open ? "pop-up-container" : "pop-up-container closed"}>
      <div className="pop-up-content">
        <h4>New Emotion</h4>
        
        <div className="pop-up-item-new-emotion">
          <div className="pop-up-item-new-emotion-1">
            {images.map((image,index)=>
            <label style={{ marginBottom: "5px" }} className="upload-button">
              <input style={{visibility:"hidden"}} onChange={(event)=>{console.log(event.target.files);uploadImages(event.target.files,index)}} type="file" accept="image/*" multiple={image.image==null ? true :false}/>
              {image.image===null ?
              <FaPlus className="upload-button-icon"/>
              :<img className="upload-button-image" src={URL.createObjectURL(image.image)}/>}
            </label>)}
          </div>
          <div className="pop-up-item-new-emotion-2">
          {inputFields.map((input)=>
        <Input item={input} changeInput={changeInput}/>)}
        <p>Full service creative agency Full service creative agency Full service creative agency Full Full service creative </p>
          </div>
        </div>
        <Button
          title={"Add Emotion."}
          position={"right"}
          event={() => {
            videoSmall();
            settingChooseEmotion();
          }}
        />
      </div>
    </div>
  );
};

export default ChooseEmotionPopUp;
