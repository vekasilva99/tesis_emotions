import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";
import polar from "../../assets/images/Polar.png";
import Item from "./item";
import Button from "../ButtonPopUp/index";
const ChooseEmotionPopUp = ({ settingChooseEmotion,open,videoSmall }) => {
  return (
    <div className={open ? "pop-up-container":"pop-up-container closed"}>
      <div className="pop-up-content">
        <h4>Choose Emotions</h4>
        <div className="pop-up-item-container">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
        <Button title={"View Statistics."} position={"right"} event={()=>{videoSmall();settingChooseEmotion()}}/>
      </div>
    </div>
  );
};

export default ChooseEmotionPopUp;
