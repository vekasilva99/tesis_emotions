import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import polar from '../../assets/images/Polar.png'
const Circle = ({drawerToggleClickHandler,video}) => {
  const history = useHistory()


  return (
    <div className="video-circle-small" >
      <img className="video-presentation-small" src={polar}></img>
 <div className="circle-video-small">
     <div className="small-circle-small-video"></div>
 </div>
 </div>
  );
};

export default Circle;