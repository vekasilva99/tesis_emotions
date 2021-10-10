import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import { BiSad } from "react-icons/bi";
import { removeError } from "../../actions/SignIn";

const ErrorPopUp = ({inputs,stateLocation,error,setError}) => {
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

 
  useEffect(() => {
   
console.log("HOLA ACA",error)
 if(error && open===false){
  console.log("HOLA ACA 2")
   setOpen(true)
   setErrorMessage(error);

 }

  }, [error]);

   

  return (
    <div
      className={open ? "pop-up" : "pop-up not-visible"}
      onClick={() => {
        setOpen(false);
        setErrorMessage("")
       
    
     
      }}
    >
      <div className={"pop-up-container-error"}>
        <BiSad className="message-icon" />
        <h4>
       {errorMessage}
        </h4>
      </div>
    </div>
  );
};

export default ErrorPopUp;
