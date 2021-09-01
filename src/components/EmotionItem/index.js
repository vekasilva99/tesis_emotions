import React, { useEffect, useState } from "react";
import polar from '../../assets/images/Polar.png'
import "../../styles/pages/__pages-dir.scss";
const Item = ({image}) => {


  return (
    <div className="emotion">
    <img className="emotion-image" src={polar}></img>
<div className="emotion-image-hover"></div>
<h2 className="emotion-title">Happy</h2>
    </div>
  );
};

export default Item;
