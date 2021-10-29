import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { NavLink, withRouter } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import { BiSad } from "react-icons/bi";
import { removeError } from "../../actions/SignIn";

const Instructions = ({instruction,setInstruction,watchVideo}) => {
  const dispatch=useDispatch()
  const history =useHistory()
  const [open, setOpen] = useState(false);


  
 
  useEffect(() => {

 if( instruction===true && open===false){
 
   setOpen(true)
   setTimeout(() => {
    setOpen(false);
    setInstruction(false)
    watchVideo()
   }, 5000);


 }

  }, [instruction]);

   

  return (
    <div
      className={open ? "pop-up" : "pop-up not-visible"}

    >
      <div className={"pop-up-container-error pink"}>
        {/* <BiSad className="message-icon" /> */}
        <h4>
       1. Please try to be in a location with good light. This will help us improve our statistics.<br/><br/>2. Make sure there is only one person watching the video. The AI will only evaluate one person in the frame. 
        </h4>
      </div>
    </div>
  );
};

export default Instructions;
