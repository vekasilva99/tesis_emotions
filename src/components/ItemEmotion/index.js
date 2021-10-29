import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import polar from "../../assets/images/Polar.png";
import "../../styles/components/__components-dir.scss";

const Item = ({emotion, image}) => {
const history = useHistory()


  return (
    <div className="item-container-home">
              <img src={emotion.embeddings[0].img} className="logo"></img>
              <div className="item-container-home-top"></div>
              <h2>{emotion.name}</h2>
            </div>
  );
};

export default Item;
