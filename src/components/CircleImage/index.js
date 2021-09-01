import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";
import polar from '../../assets/images/Polar.png'
const Circle = ({drawerToggleClickHandler}) => {


  return (
    <div className="image-circle">
      <img className="video-presentation" src={polar}></img>
 <div className="big-circle-image">
     <div className="small-circle"></div>
 </div>
 </div>
  );
};

export default Circle;