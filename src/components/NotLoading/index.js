import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { NavLink, withRouter } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import { BiSad } from "react-icons/bi";
import { removeError } from "../../actions/SignIn";

const NotLoading = ({message,setMessage}) => {
  const dispatch=useDispatch()
  const history =useHistory()
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(message);

  
 
  useEffect(() => {

 if(message !="" && open===false){
 
   setOpen(true)


 }

  }, [message]);

   

  return (
    <div
      className={open ? "pop-up" : "pop-up not-visible"}
      onClick={() => {
        setOpen(false);
        setErrorMessage("")
        setMessage("")
        window.location.reload()
   
       
      
     
      }}
    >
      <div className={"pop-up-container-error"}>
        <BiSad className="message-icon" />
        <h4>
       {message}
        </h4>
      </div>
    </div>
  );
};

export default NotLoading;
