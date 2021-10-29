import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { NavLink, withRouter } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import { BiSad } from "react-icons/bi";
import { removeError } from "../../actions/SignIn";

const NotExistPopUp = ({inputs,stateLocation,company}) => {
  const dispatch=useDispatch()
  const history =useHistory()
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const error = useSelector((state) => (state.brands.error));
  const {role} = useSelector((state) => (state.auth));
 
  useEffect(() => {

 if(error !="" && open===false){
 
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
        dispatch(removeError())
        setTimeout(() => {
          if(role==="company"){
            history.push('/homeCompany')
          }else{
            history.push('/home')
          }
        }, 2000);
       
      
     
      }}
    >
      <div className={"pop-up-container-error"}>
        <BiSad className="message-icon" />
        <h4>
<<<<<<< HEAD
       Oops! It looks like this video is not available.
=======
       Oops! Parece que este video no se encuentra disponible.
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
        </h4>
      </div>
    </div>
  );
};

export default NotExistPopUp;
