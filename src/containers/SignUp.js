import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Select from "../components/Select/index";
import Input from "../components/InputWhite/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "../components/Button/index";
import countryList from "../helpers/countries";
import DatePicker from "../components/DatePicker";
import ErrorPopUp from "../components/ErrorPopUp/index";
import { signUpUserRequest } from "../actions/SignUp";
import { notLoading } from "../actions/Loader";
import "../styles/pages/__pages-dir.scss";
import validator from "validator";
const SignUp = (props) => {
  const [birthdate, setBirthdate] = useState(new Date());
  const [birthdateError, setBirthdateError] = useState("");
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const errors = useSelector((state) => ({ ...state.auth.error }));
  const loader = useSelector((state) => ({ ...state.signUp})).loader;
  console.log("LOADER",loader)

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
    console.log("click");
  };

  const changeInput = (name, event) => {
    let fields = inputFields;
    var item = inputFields.find(function (input, index) {
      if (input.name == name) fields[index].value = event;

      setInputFields(fields);
    });
  };

  const changeSelect = (name, event) => {
    let fields = selectFields;
    var item = selectFields.find(function (input, index) {
      if (input.name == name) fields[index].selected = event;

      setSelectFields(fields);
    });
  };

  useEffect(() => {
    console.log("hollllll");
    
    if (errors.emailError && errors.passwordError) {
      setError(true, 0, errors.emailError);
      setError(true, 0, errors.passwordError);
    }
  }, [errors]);

  useEffect(() => {
    if(loader){
    setTimeout(() => {setSubmitted(false);dispatch(notLoading())}, 1800);
    }
  }, [loader]);

  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Enter your full name",
      name: "full_name",
      value: "",
      error: "",
      type: "text",
    },
    {
      placeholder: "Enter your email",
      name: "email",
      value: "",
      error: "",
      type: "email",
    },

    {
      placeholder: "Enter your password",
      name: "password",
      value: "",
      error: "",
      type: "password",
    },
    {
      placeholder: "Confirm your password",
      name: "confirm password",
      value: "",
      error: "",
      type: "password",
    },
  ]);

  const [selectFields, setSelectFields] = useState([
    {
      placeholder: "Choose your gender",
      name: "gender",
      error: "",
      selected: "",
      type: "text",
      options: [
        { value: "Male", name: "Male" },
        { value: "Female", name: "Female" },
        { value: "Other", name: "Other" },
      ],
    },
    {
      placeholder: "Choose your country",
      name: "country",
      error: "",
      selected: "",
      type: "text",
      options: countryList,
    },
  ]);
  const setError = (input, index, error) => {
    if (input) {
      let fields = inputFields;
      fields[index].error = error;
      setInputFields(fields);
    } else {
      let fields = selectFields;
      fields[index].error = error;
      setSelectFields(fields);
    }
  };

  const signUp = () => {
    setSubmitted(true);
    let emptyField = false;
    console.log('FALTA ESTO 0',selectFields[0])
    let error = false;
    console.log(inputFields);
    console.log(selectFields);
    if (inputFields[0].value === "") {
      setError(true, 0, "Required Field");
      console.log("1");
      emptyField = true;
    } 
    if (inputFields[1].value === "") {
      setError(true, 1, "Required Field");
      console.log("2");
      emptyField = true;
    } 
    if (inputFields[2].value === "") {
      setError(true, 2, "Required Field");
      emptyField = true;
      console.log("3");
    } 
     if (inputFields[3].value === "") {
      setError(true, 3, "Required Field");
      emptyField = true;
      console.log("4");
    } 
    if (selectFields[0].selected === "") {
  
      setError(false, 0, "Required Field");
      console.log('FALTA ESTO',selectFields[0])
      emptyField = true;
      console.log("5");
    } 
     if (selectFields[1].selected === "") {
      setError(false, 1, "Required Field");
      emptyField = true;
      console.log("6");
    } 
    if (birthdate === new Date()) {
      console.log("7");
      setBirthdateError("Required Field");
      emptyField = true;
    }

    if (!validator.isEmail(inputFields[1].value)) {
      setError(true, 1, "Invalid Email");
      error = true;
      console.log("8");
    }
    if (!validator.isStrongPassword(inputFields[2].value)) {
      setError(true, 2, "Weak Password");
      error = true;
      console.log("9");
    }
    if (inputFields[2].value != inputFields[3].value) {
      setError(true, 2, "Passwords do not match");
      setError(true, 3, "Passwords do not match");
      error = true;
      console.log("10");
    }
    console.log(error, emptyField);
   
    if (!error && !emptyField) {
      console.log("entreeeee");
      let payload = {
        email: inputFields[1].value,
        password: inputFields[3].value,
        birthdate: birthdate,
        gender: selectFields[0].selected,
        country: selectFields[1].selected,
        full_name: inputFields[0].value,
        active: true,
        isAdmin: false,
      };
     
      dispatch(signUpUserRequest(payload));
    }else{
      setTimeout(() => {setSubmitted(false)}, 1200);
    }
   
  };

  return (
    <>
    <div className={loader || submitted ? "full-page-loader" :"full-page-loader not-loading"}>
          <CircularProgress size={100} thickness={5}/></div>
      <ErrorPopUp inputs={inputFields} />
      <div className="app-no-account">
        <div className="input-container-column">
          {selectFields.map((input, index) => (
            <Select
              changeError={setError}
              index={index}
              setSubmitted={() => {
                setSubmitted(false);
              }}
              submitted={submitted}
              item={input}
              changeInput={changeSelect}
            />
          ))}
          <DatePicker
          errorDate={birthdateError}
          removeError={()=>{setBirthdateError("")}}
            white={true}
            selected={birthdate}
            name={"Birthdate"}
            onChange={(date) => setBirthdate(date)}
          />
          {inputFields.map((input, index) => (
            <Input
              changeError={setError}
              setSubmitted={() => {
                setSubmitted(false);
              }}
              submitted={submitted}
              index={index}
              large={false}
              item={input}
              changeInput={changeInput}
            />
          ))}
        </div>
        <Button event={signUp} title={"Sign Up"} position={"left"} />
        <div className="link-button">
          <h3>Already have an account? </h3>
          <h4> Sign In Here</h4>
        </div>
        <div className="link-button2">
          <h3>Want to create an account? </h3>
          <h4> Sign Up Here</h4>
        </div>
      </div>
    </>
  );
};

export default SignUp;
