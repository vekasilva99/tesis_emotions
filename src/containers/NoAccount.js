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
      placeholder: "Enter your age",
      name: "age",
      value: "",
      type: "number",
      error: "",
    },
  ]);

  const [selectFields, setSelectFields] = useState([
    {
      placeholder: "Choose your gender",
      name: "gender",
      selected: "",
      type: "text",
      error: "",
      options: [
        { value: "Male", name: "Male" },
        { value: "Female", name: "Female" },
        { value: "Other", name: "Other" },
      ],
    },
    {
      placeholder: "Choose your country",
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
      setError(true, 0, "Required Field");
      emptyField = true;
    }
    if (selectFields[0].selected === "") {
      setError(false, 0, "Required Field");

      emptyField = true;
    }
    if (selectFields[1].selected === "") {
      setError(false, 1, "Required Field");
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
          <h3>Already have an account? </h3>
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
            Sign In Here
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

export default NoAccount;
