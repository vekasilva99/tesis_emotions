import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/__components-dir.scss";
import polar from "../../assets/images/Polar.png";
import Button from "../ButtonPopUp/index";
import Input from "../Input/index";
import { FaPlus } from "react-icons/fa";
import DurationPicker from 'react-duration-picker'
import validator from "validator";
import { addVideoRequest } from "../../actions";

const AddVideoPopUp = ({ open }) => {
  const dispatch=useDispatch()
  const [submitted,setSubmitted]=useState(false)
  const [duration,setDuration]=useState(null)
  const [image, setImage] = useState(null);
  const [preview,setPreview]=useState(null)
  const { token, _id, role,loader } = useSelector((state) => ({
    ...state.auth,
  }));

  console.log("ID", _id)
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

  const onSubmit =()=>{
    setSubmitted(true);
    let emptyField = false;
    let error = false;


    if (inputFields[0].value === "") {
      setError(true, 0, "Required Field");
      emptyField = true;
    } 
    if (inputFields[1].value === "") {
      setError(true, 1, "Required Field");
      console.log("2");
      emptyField = true;
    } 
    if (duration===null) {
      // setError(true, 2, "Required Field");
      emptyField = true;

    } 
     if (image === null) {
      // setError(true, 3, "Required Field");
      emptyField = true;

    } 
    if (!validator.isURL(inputFields[1].value)) {
      setError(true, 1, "Invalid Email");
      error = true;
      console.log("8");
    }
 
    console.log(error, emptyField);
   
    if (!error && !emptyField) {
      console.log("entreeeee");
      let payload = {
        name: inputFields[0].value,
        companyID: _id,
        mainImg: image,
        duration: duration.hours*3600+duration.minutes*60+duration.seconds,
        link: inputFields[1].value,
        active: true,
      };
     
      dispatch(addVideoRequest(payload));
    }else{
      setTimeout(() => {setSubmitted(false)}, 1200);
    }
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
        <Button event={()=>{onSubmit()}}title={"Add Video."} position={"right"} />
      </div>
    </div>
  );
};

export default AddVideoPopUp;
