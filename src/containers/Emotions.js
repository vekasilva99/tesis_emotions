import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import { fetchEmotionsRequest, loading } from "../actions/Company";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "../components/Drawer/index";
import AddVideoPopUp from "../components/AddVideo/index";
import AddEmotionPopUp from "../components/AddEmotion/index";
import Item from "../components/EmotionItem/index";
import Button from "../components/Button/index";
import ErrorPopUpModel from "../components/ErrorPopUpModel/index"
import polar from "../assets/images/Polar.png";
import "../styles/pages/__pages-dir.scss";
const Emotions = (props) => {
  const [error, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { _id } = useSelector((state) => ({
    ...state.auth,
  }));
  const emotions = useSelector((state) => ({ ...state.company })).emotions;

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
  useEffect(() => {
    if (emotions.length === 0) {
      dispatch(fetchEmotionsRequest(_id));
    }
  }, []);
  return (
    <>
      <AddEmotionPopUp error={error} setErrorMessage={setErrorMessage} open={open} setOpen={setOpen} />
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
          Emociones.
        </h1>
        {emotions.length > 0 ? (
          <div className="emotions-container">
            {emotions.map((emotion) => {
              return <Item emotion={emotion} />;
            })}
          </div>
        ) : null}
        <Button
          event={() => {
            setOpen(true);
          }}
          disable={error ? true :false}
          title={"Agregar Emoción."}
          position={"right"}
        />
      </div>
    </>
  );
};

export default Emotions;