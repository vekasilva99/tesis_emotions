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
import { useLocation } from "react-router-dom";
import validator from "validator";
import { signInUserRequest } from "../actions/SignIn";
import "../styles/pages/__pages-dir.scss";
const SignIn = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const errors = useSelector((state) => ({ ...state.auth.error }));
  console.log("LOCATION", location);
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const changeInput = (name, event) => {
    let fields = inputFields;
    var item = inputFields.find(function (input, index) {
      if (input.name == name) fields[index].value = event;

      setInputFields(fields);
    });
  };
  const setError = (input, index, error) => {
    if (input) {
      let fields = inputFields;
      fields[index].error = error;
      setInputFields(fields);
    }
  };

  const [inputFields, setInputFields] = useState([
    {
      placeholder: "Ingrese su email",
      name: "email",
      value: "",
      error: !errors ? "" : errors.emailError ? errors.emailError : "",
      type: "email",
    },
    {
      placeholder: "Ingrese su contraseña",
      name: "contraseña",
      value: "",
      error:
        !errors === {} ? "" : errors.passwordError ? errors.passwordError : "",
      type: "password",
    },
  ]);

  useEffect(() => {

    if (errors.emailError && errors.passwordError) {
      setError(true, 0, errors.emailError);
      setError(true, 1, errors.passwordError);
    }
  }, [errors]);

  const signIn = () => {
    setSubmitted(true);
    let emptyField = false;
    let error = false;
    if (inputFields[0].value === "") {
      setError(true, 0, "Campo requerido");
      emptyField = true;
    } 
    if (inputFields[1].value === "") {
      setError(true, 1, "Campo requerido");
      emptyField = true;
    }
    if (!validator.isEmail(inputFields[0].value)) {
      setError(true, 0, "Email invalido");
      error = true;
    }
    if (!emptyField && !error) {
      dispatch(
        signInUserRequest({
          email: inputFields[0].value,
          password: inputFields[1].value,
          history: history,
        })
      );
    }
  };

  return (
    <>
      <ErrorPopUp inputs={inputFields} />
      <div className="app-no-account">
        <div className="input-container-column">
          {inputFields.map((input, index) => (
            <Input
              changeError={setError}
              setSubmitted={() => {
                setSubmitted(false);
              }}
              submitted={submitted}
              index={index}
              large={true}
              item={input}
              changeInput={changeInput}
            />
          ))}
        </div>
        <Button event={signIn} title={"Iniciar Sesión"} position={"left"} top />

        <div className="link-button" style={{ bottom: "16vh" }}>
          <h3>Desea crear una cuenta? </h3>
          <h4
            onClick={() => {
              history.push("/signup");
            }}
          >
            {" "}
            Registrese Aqui
          </h4>
        </div>
        {location.state ?
        <>
        {location.state.videoId && location.state.companyId ? (
          <div className="link-button2" style={{ bottom: "12vh" }}>
            <h3>Desea ver sin crear una cuenta? </h3>
            <h4   onClick={() => {
              history.push(`/watchvideo/${location.state.companyId}/${location.state.videoId}`);
            }}>Click Aqui</h4>
          </div>
        ) : null}
        </>
        :null}
      </div>
    </>
  );
};

export default SignIn;
