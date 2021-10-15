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
        1. Intente estar en un lugar con buena iluminación. Esto nos ayudará a mejorar nuestras estadísticas.<br/><br/>2. Asegúrese de que solo haya una persona viendo el video. La IA solo evaluará a una persona en el marco.
        </h4>
      </div>
    </div>
  );
};

export default Instructions;
