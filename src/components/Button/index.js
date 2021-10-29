import { IFFT } from "@tensorflow/tfjs";
import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from 'react-icons/fi';
import "../../styles/components/__components-dir.scss";
const Button = ({title,event,position,top,hide,disable}) => {
const right =position==="right" ? "0": "";
const left = position === "left" ? "0":""
const bottom = top ? "25vh" : "15vh"

  return (
<div className={hide ? disable ? "button-container hidden-button disable-button" :"button-container hidden-button": disable ? "button-container disable-button":"button-container"} style={{right:right,left:left,bottom:bottom}} onClick={()=>{if(event && (!disable || disable===undefined) ){
  event()
}}}>
  <h1 className="button-title">{title}</h1>
  <FiArrowUpRight className="button-icon"/>

</div>
  );
};

export default Button;
