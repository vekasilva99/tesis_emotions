import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Select from "../components/Select/index";
import Input from "../components/InputWhite/index";
import Button from "../components/Button/index";
import ErrorPopUp from "../components/ErrorPopUp/index";
import countryList from "../helpers/countries";
import validator from "validator";
import { signInCompanyRequest } from "../actions/SignIn";
import "../styles/pages/__pages-dir.scss";
const SignInCompany = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const errors = useSelector((state) => ({ ...state.auth.error }));

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const setError = (input, index, error) => {
    if (input) {
      let fields = inputFields;
      fields[index].error = error;
      setInputFields(fields);
    }
  };

  const changeInput = (name, event) => {
    let fields = inputFields;
    var item = inputFields.find(function (input, index) {
      if (input.name == name) fields[index].value = event;

      setInputFields(fields);
    });
  };

  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Enter your email",
      name: "email",
      value: "",
      error: !errors ? "" : errors.emailError ? errors.emailError : "",
      type: "email",
    },
    {
      placeholder: "Enter your password",
      name: "password",
      value: "",
      error:
        errors === {} ? "" : errors.passwordError ? errors.passwordError : "",
      type: "password",
    },
  ]);
  useEffect(() => {
    if (errors.emailError && errors.passwordError) {
      setError(true, 0, errors.emailError);
      setError(true, 0, errors.passwordError);
    }
  }, [errors]);

  const signIn = () => {
    setSubmitted(true);
    let emptyField = false;
    let error = false;
    if (inputFields[0].value === "") {
      setError(true, 0, "Required Field");
      emptyField = true;
    } else if (inputFields[1].value === "") {
      setError(true, 1, "Required Field");
      emptyField = true;
    }
    if (!validator.isEmail(inputFields[0].value)) {
      setError(true, 0, "Invalid Email");
      error = true;
    }
    if (!emptyField && !error) {
      dispatch(
        signInCompanyRequest({
          email: inputFields[0].value,
          password: inputFields[1].value,
          history: history.push("/homeCompany"),
        })
      );
    }
  };

  return (
    <>
      <ErrorPopUp inputs={inputFields} />

      <div className="app-no-account pink">
        <div className="input-container-column">
          {inputFields.map((input, index) => (
            <Input
              changeError={setError}
              setSubmitted={() => {
                setSubmitted(false);
              }}
              pink={true}
              submitted={submitted}
              index={index}
              large={true}
              item={input}
              changeInput={changeInput}
            />
          ))}
        </div>
        <Button event={signIn} title={"Sign In"} position={"left"} top />
        <div className="link-button green" style={{ bottom: "16vh" }}>
          <h3>Wanto to watch video without an account? </h3>
          <h4>Click Here</h4>
        </div>
        <div className="link-button2 green" style={{ bottom: "12vh" }}>
          <h3>Want to create an account? </h3>
          <h4> Sign Up Here</h4>
        </div>
      </div>
    </>
  );
};

export default SignInCompany;
