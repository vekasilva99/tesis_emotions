import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";

const Circle = ({title, data,drawerToggleClickHandler}) => {


  return (
 <div className="circle-stat">
   <div className="one">

   </div>
   <div className="two">
   <h4 className="circle-stat-title">{data}</h4>
   </div>
   <div className="three">
   <h4 className="circle-stat-detail">{title}</h4>
   </div>
     
 </div>
  );
};

export default Circle;