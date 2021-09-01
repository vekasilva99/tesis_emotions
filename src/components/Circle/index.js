import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";

const Circle = ({drawerToggleClickHandler}) => {


  return (
 <div className="big-circle">
     <div className="small-circle" style={{background:"#E5E5E5",opacity:"1"}}></div>
 </div>
  );
};

export default Circle;