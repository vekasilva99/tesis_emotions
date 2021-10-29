import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Select from "../components/Select/index";
import Input from "../components/InputWhite/index";
import Button from "../components/Button/index";
import countryList from "../helpers/countries";
import { useParams } from "react-router-dom";
import "../styles/pages/__pages-dir.scss";
const NoAccount = (props) => {
  const history = useHistory();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
  const { id, videoId } = useParams();
  const changeSelect = (name, event) => {
    let fields = selectFields;
    var item = selectFields.find(function (input, index) {
      if (input.name == name) fields[index].selected = event;

      setSelectFields(fields);
    });
  };

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

  const [inputFields, setInputFields] = useState([
    {
<<<<<<< HEAD
      placeholder: "Enter your age",
      name: "age",
=======
      placeholder: "Ingrese su edad",
      name: "edad",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      value: "",
      type: "number",
      error: "",
    },
  ]);

  const [selectFields, setSelectFields] = useState([
    {
<<<<<<< HEAD
      placeholder: "Choose your gender",
      name: "gender",
=======
      placeholder: "Seleccione su género",
      name: "género",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      selected: "",
      type: "text",
      error: "",
      options: [
<<<<<<< HEAD
        { value: "Male", name: "Male" },
        { value: "Female", name: "Female" },
        { value: "Other", name: "Other" },
      ],
    },
    {
      placeholder: "Choose your country",
=======
        { value: "Masculino", name: "Masculino" },
        { value: "Femenino", name: "Femenino" },
        { value: "Otro", name: "Otro" },
      ],
    },
    {
      placeholder: "Seleccione su país",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      name: "country",
      selected: "",
      type: "text",
      error: "",
      options: countryList,
    },
  ]);

  const submit = () => {
    setSubmitted(true);
    let emptyField = false;

    let error = false;

    if (inputFields[0].value === "") {
<<<<<<< HEAD
      setError(true, 0, "Required Field");
      emptyField = true;
    }
    if (selectFields[0].selected === "") {
      setError(false, 0, "Required Field");
=======
      setError(true, 0, "Campo requerido");
      emptyField = true;
    }
    if (selectFields[0].selected === "") {
      setError(false, 0, "Campo requerido");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf

      emptyField = true;
    }
    if (selectFields[1].selected === "") {
<<<<<<< HEAD
      setError(false, 1, "Required Field");
=======
      setError(false, 1, "Campo requerido");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      emptyField = true;
    }

    if (!error && !emptyField) {
      let payload = {
        age: inputFields[0].value,
        gender: selectFields[0].selected,
        country: selectFields[1].selected,
      };

      localStorage.setItem("user", JSON.stringify(payload));
      history.push(`/brand/${id}/${videoId}/watch`);
    } else {
      setTimeout(() => {
        setSubmitted(false);
      }, 1200);
    }
  };

  return (
    <>
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
              large={false}
              item={input}
              changeInput={changeInput}
            />
          ))}
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
        </div>
        <Button event={submit} title={"Continue"} position={"left"} top />
        <div className="link-button" style={{ bottom: "16vh" }}>
<<<<<<< HEAD
          <h3>Already have an account? </h3>
=======
          <h3>Ya tiene una cuenta? </h3>
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          <h4
            onClick={() => {
              history.push({
                pathname: "/signin",
                state: {
                  // location state
                  videoId: videoId,
                  companyId: id,
                },
              });
            }}
          >
            {" "}
<<<<<<< HEAD
            Sign In Here
=======
            Inicia Sesión aqui
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          </h4>
        </div>
        {/* <div className="link-button2">
          <h3>Want to create an account? </h3>
          <h4> Sign Up Here</h4>
        </div> */}
      </div>
    </>
  );
};

<<<<<<< HEAD
export default NoAccount;
=======
export default NoAccount;
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
