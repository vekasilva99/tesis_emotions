import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../components/Sidebar/index";
import { useHistory } from "react-router";
import Drawer from "../components/Drawer/index";
import Select from "../components/Select/index";
import Input from "../components/InputWhite/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "../components/Button/index";
import countryList from "../helpers/countries";
import DatePicker from "../components/DatePicker";
import ErrorPopUp from "../components/ErrorPopUp/index";
import SuccessPopUp from "../components/SuccessPopUp/index";
import { signUpUserRequest } from "../actions/SignUp";
import { notLoading } from "../actions/Loader";
import "../styles/pages/__pages-dir.scss";
import validator from "validator";
import moment from "moment";
const SignUp = (props) => {
  const [birthdate, setBirthdate] = useState(new Date());
  const [birthdateError, setBirthdateError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const errors = useSelector((state) => ({ ...state.auth.error }));
  const loader = useSelector((state) => ({ ...state.signUp })).loader;

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

  const changeSelect = (name, event) => {
    let fields = selectFields;
    var item = selectFields.find(function (input, index) {
      if (input.name == name) fields[index].selected = event;

      setSelectFields(fields);
    });
  };

  useEffect(() => {
    if (errors.emailError && errors.passwordError) {
      setError(true, 0, errors.emailError);
      setError(true, 0, errors.passwordError);
    }
  }, [errors]);

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setSubmitted(false);
        dispatch(notLoading());
      }, 1800);
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
      placeholder: "Ingrese su email",
      name: "email",
      value: "",
      error: "",
      type: "email",
    },

    {
      placeholder: "Ingrese contraseña",
      name: "contraseña",
      value: "",
      error: "",
      type: "password",
    },
    {
      placeholder: "Confirme contraseña",
      name: "confirme contraseña",
      value: "",
      error: "",
      type: "password",
    },
  ]);

  const [selectFields, setSelectFields] = useState([
    {
      placeholder: "Seleccione su genero",
      name: "genero",
      error: "",
      selected: "",
      type: "text",
      options: [
        { value: "Masculino", name: "Masculino" },
        { value: "Femenino", name: "Femenino" },
        { value: "Otro", name: "Otro" },
      ],
    },
    {
      placeholder: "Seleccione su país",
      name: "país",
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

    let error = false;
    if (inputFields[0].value === "") {
      setError(true, 0, "Campo requerido");
      emptyField = true;
    }
    if (inputFields[1].value === "") {
      setError(true, 1, "Campo requerido");
      emptyField = true;
    }
    if (inputFields[2].value === "") {
      setError(true, 2, "Campo requerido");
      emptyField = true;
    }
    if (inputFields[3].value === "") {
      setError(true, 3, "Campo requerido");
      emptyField = true;
    }
    if (selectFields[0].selected === "") {
      setError(false, 0, "Campo requerido");
      emptyField = true;
    }
    if (selectFields[1].selected === "") {
      setError(false, 1, "Campo requerido");
      emptyField = true;
    }
    if (
      moment(birthdate).format("LL") === moment(new Date()).format("LL") ||
      birthdate >= new Date()
    ) {
      setBirthdateError("Campo requerido");
      emptyField = true;
    }

    if (!validator.isEmail(inputFields[1].value)) {
      setError(true, 1, "Email invalido");
      error = true;
    }
    if (!validator.isStrongPassword(inputFields[2].value)) {
      setError(true, 2, "Contraseña Debil");
      error = true;
    }
    if (inputFields[2].value != inputFields[3].value) {
      setError(true, 2, "Contraseñas no concuerdan");
      setError(true, 3, "Contraseñas no concuerdan");
      error = true;
    }

    if (!error && !emptyField) {
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
    } else {
      setTimeout(() => {
        setSubmitted(false);
      }, 1200);
    }
  };

  const defaultInputs = () => {
    let aux = inputFields;
    let auxSelect = selectFields;
    aux[0].value = "";
    aux[1].value = "";
    aux[2].value = "";
    aux[3].value = "";
    auxSelect[0].selected = "";
    auxSelect[1].selected = "";
    setInputFields(aux);
    setSelectFields(auxSelect);
  };
  return (
    <>
      <div
        className={
          loader 
            ? "full-page-loader"
            : "full-page-loader not-loading"
        }
      >
        <CircularProgress size={100} thickness={5} />
      </div>
      <ErrorPopUp inputs={inputFields} />
      <SuccessPopUp defaultInputs={defaultInputs} inputs={inputFields} />
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
            removeError={() => {
              setBirthdateError("");
            }}
            white={true}
            selected={birthdate}
            submitted={submitted}
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
        <Button event={signUp} title={"Registrarse"} position={"left"} />
        <div className="link-button">
          <h3>Ya tiene cuenta? </h3>
          <h4  onClick={() => {
              history.push("/signin");
            }}> Ingrese Aqui</h4>
        </div>
      </div>
    </>
  );
};

export default SignUp;