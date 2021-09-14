import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";

import Drawer from "../components/Drawer/index";
import AddVideoPopUp from "../components/AddVideo/index";
import AddEmotionPopUp from "../components/AddEmotion/index";
import Item from "../components/EmotionItem/index";
import Button from "../components/Button/index";
import polar from "../assets/images/Polar.png";
import "../styles/pages/__pages-dir.scss";
const Emotions = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
    console.log("click");
  };

  const changeInput = (name, event) => {
    let fields = inputFields;
    var item = inputFields.find(function (input, index) {
      if (input.name == name) fields[index].value = event;
      console.log("entre", event);
      console.log("entre", fields[index].value);
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
      placeholder: "Enter company name",
      name: "company name",
      value: "",
      type: "text",
    },
    { placeholder: "Enter email", name: "email", value: "", type: "email" },
    {
      placeholder: "Enter password",
      name: "password",
      value: "",
      type: "password",
    },
    {
      placeholder: "Confirm your password",
      name: "confirm password",
      value: "",
      type: "password",
    },
  ]);

  return (
    <>
    <AddVideoPopUp open={open}/>
      <Sidebar
        drawerToggleClickHandler={drawerToggleClickHandler}
        color={"#A9B18F"}
      />
      <Drawer
        color={"#A9B18F"}
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />

      <div className="app-emotions">
        <h1
          className="subtitle"
          style={{ color: "#CB807D", marginTop: "0px", marginBottom: "60px" }}
        >
          Emotions.
        </h1>
        <div className="emotions-container">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
        <Button event={()=>{setOpen(true)}}title={"Add Emotion."} position={"right"} />
      </div>
    </>
  );
};

export default Emotions;
