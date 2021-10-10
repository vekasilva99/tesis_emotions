import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import polar from '../../assets/images/Polar.png'
import Emotions from "../../containers/Emotions";
import "../../styles/pages/__pages-dir.scss";
const EmbeddingItem = ({image,embedding,select,setOpen,index,setIndex,disable}) => {
  const history = useHistory();

useEffect(() => {
 console.log("EMBEDDING",embedding.img)
}, [embedding]);
  return (
    <div className={disable ? "emotion disable-emotion":"emotion"} onClick={()=>{if(!disable || disable==undefined){select(embedding);setOpen(true);setIndex(index)}}}>
    <img className="emotion-image" src={embedding.img}></img>
<div className="emotion-image-hover"></div>

    </div>
  );
};

export default EmbeddingItem;
