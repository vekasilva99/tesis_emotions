import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import { BiSad } from "react-icons/bi";
import { removeError } from "../../actions/SignIn";

const ErrorPopUp = ({inputs,stateLocation,company}) => {
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const errors = useSelector((state) => ({...state.auth.error }));
  const errorsCompany = useSelector((state) => ({...state.company.error }));
 
  useEffect(() => {
   
    if(company===null || company === undefined || company===false){
 if(Object.keys(errors).length >0 && open===false){
 
   setOpen(true)
   setErrorMessage(errors[Object.keys(errors)[0]]);

 }
}
  }, [errors]);

   
  useEffect(() => {
    if(company){
 if(Object.keys(errorsCompany).length >0 && open===false){

   setOpen(true)
   setErrorMessage(errorsCompany[Object.keys(errorsCompany)[0]]);

 }
}
  }, [errorsCompany]);
  return (
    <div
      className={open ? "pop-up" : "pop-up not-visible"}
      onClick={() => {
        setOpen(false);
        setErrorMessage("")
        dispatch(removeError())
     
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
