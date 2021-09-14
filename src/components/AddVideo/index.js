import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";
import polar from "../../assets/images/Polar.png";
import Button from "../ButtonPopUp/index";
import Input from "../Input/index";
import { FaPlus } from "react-icons/fa";
import DurationPicker from 'react-duration-picker'
const AddVideoPopUp = ({ open }) => {
  const [submitted,setSubmitted]=useState(false)
  const [duration,setDuration]=useState(null)
  const [image, setImage] = useState(null);
  const [preview,setPreview]=useState(null)

  const uploadImage =(files)=>{
  

    setImage(files[0])
      setPreview(URL.createObjectURL(files[0]))
    
    }
  
  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Enter Video Name",
      name: "video name",
      value: "",
      type: "text",
      error:""
    },
    {
      placeholder: "Enter Video Link",
      name: "video link",
      value: "",
      type: "text",
      error:""

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


  const setError = (input, index, error) => {
    if (input) {
      let fields = inputFields;
      fields[index].error = error;
      setInputFields(fields);
    }
  };

  const onChangePicker=(d)=>{
setDuration(d)
  }


  return (
    <div className={open ? "pop-up-container":"pop-up-container closed"}>
      <div className="pop-up-content">
        <h4>New Video</h4>
        <div className="pop-up-input-container" >
        {inputFields.map((input,index)=>
        <Input index={index} changeError={setError} setSubmitted={setSubmitted} submitted={submitted} item={input} changeInput={changeInput}/>)}
            <div>
         <h2 className="placeholder">Video Duration</h2>
        <DurationPicker
      onChange={onChangePicker}
      initialDuration={{ hours: 0, minutes: 0, seconds: 0 }}
      maxHours={5}
    />
    </div>
          <div style={{display:"flex",flexDirection:"column"}}>
    <h2 className="placeholder">Video Image</h2>
    <label
        style={{ marginBottom: "5px", marginTop: "0px",marginLeft:"20px" }}
        className="upload-button-3"
      >
        <input
          style={{ visibility: "hidden" }}
          onChange={(event) => {
            uploadImage(event.target.files)
          }}
          type="file"
          accept="image/*"
          multiple={false}
        />

        {image === null ? (
          <FaPlus className="upload-button-icon-3" />
        ) : (
          <img
            className="upload-button-image-2"
            src={URL.createObjectURL(image)}
          />
        )}
        </label>
    </div>
      
  
        </div>
        <Button title={"Add Video."} position={"right"} event={()=>{console.log('video')}}/>
      </div>
    </div>
  );
};

export default AddVideoPopUp;
