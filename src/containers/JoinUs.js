import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import { useDispatch,useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "../components/Input/index";
import Button from "../components/Button/index";
import validator from "validator";
import { signUpCompanyRequest } from "../actions/SignUp";
import ErrorPopUp from "../components/ErrorPopUp/index";
import SuccessPopUp from "../components/SuccessPopUp/index";
import { notLoading } from "../actions/Loader";
import "../styles/pages/__pages-dir.scss";
const JoinUs = (props) => {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const errors = useSelector((state) => ({ ...state.auth.error }));
  const loader = useSelector((state) => ({ ...state.signUp})).loader;

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
  useEffect(() => {
    console.log("hollllll");
    
    if (errors.emailError && errors.passwordError) {
      setError(true, 0, errors.emailError);
    
    }
  }, [errors]);

  useEffect(() => {
    if(loader){
    setTimeout(() => {setSubmitted(false);dispatch(notLoading())}, 1800);
    }
  }, [loader]);

  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Enter company name",
      name: "company name",
      value: "",
      error:"",
      type: "text",

    },
    { placeholder: "Enter email", name: "email", value: "", type: "email" },
    {
      placeholder: "Enter password",
      name: "password",
      value: "",
      error:"",
      type: "password",
    },
    {
      placeholder: "Confirm your password",
      name: "confirm password",
      value: "",
      error:"",
      type: "password",
    },
  ]);

  const setError = (input, index, error) => {
    if (input) {
      let fields = inputFields;
      fields[index].error = error;
      setInputFields(fields);
    } 
  };


  const signUp = () => {
    setSubmitted(true)
    let emptyField=false;
    let error=false;
    if(inputFields[0].value===""){
      setError(true, 0, "Required Field");
      console.log("1")
      emptyField = true;
    }else if(inputFields[1].value===""){
      setError(true, 1, "Required Field");
      console.log("2")
      emptyField = true;
    }else if(inputFields[2].value===""){
      setError(true, 2, "Required Field");
      emptyField = true;
      console.log("3")
    }else if(inputFields[3].value===""){
      setError(true, 3, "Required Field");
      emptyField = true;
      console.log("4")
    }

    

    

    if(!validator.isEmail(inputFields[1].value)){
      setError(true, 1, "Invalid Email");
      error=true;
      console.log("8")
    }
    if(!validator.isStrongPassword(inputFields[2].value)){
      setError(true, 2, "Weak Password");
      error=true
      console.log("9")
    }
    if(inputFields[2].value != inputFields[3].value){
      setError(true, 2, "Passwords do not match");
      setError(true, 3, "Passwords do not match");
      error=true
      console.log("10")
    }
console.log(error,emptyField)
    if(!error && !emptyField){
      console.log("entreeeee")
      let payload = {
        email:inputFields[1].value,
        password:inputFields[3].value,
        mainImg:"image",
        full_name:inputFields[0].value,
        active:false,
        accepted:false,
      }
      dispatch(signUpCompanyRequest(payload))
    }else{
      setTimeout(() => {setSubmitted(false)}, 1200);
    }
  
  };
  return (
    <>
       <div className={loader || submitted ? "full-page-loader" :"full-page-loader not-loading"}>
          <CircularProgress size={100} thickness={5}/></div>
      <ErrorPopUp inputs={inputFields} />
      <SuccessPopUp inputs={inputFields} />
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
        {inputFields.map((input,index)=>
        <Input  changeError={setError}
        setSubmitted={() => {
          setSubmitted(false);
        }}
        submitted={submitted}
        index={index}
        large={false}
        item={input}
        changeInput={changeInput}/>)}
        </div>
        <Button event={signUp} title={'Join Now.'} position={"right"}/>
      </div>
    </>
  );
};

export default JoinUs;
