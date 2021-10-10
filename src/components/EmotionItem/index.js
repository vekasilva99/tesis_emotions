import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import polar from '../../assets/images/Polar.png'
import Emotions from "../../containers/Emotions";
import "../../styles/pages/__pages-dir.scss";
const Item = ({image,emotion}) => {
  const history = useHistory();

  return (
    <div className="emotion" onClick={()=>{history.push(`/emotion/${emotion._id}`)}}>
    <img className="emotion-image" src={emotion.embeddings[0].img}></img>
<div className="emotion-image-hover"></div>
<h2 className="emotion-title">{emotion.name}</h2>
    </div>
  );
};

export default Item;
