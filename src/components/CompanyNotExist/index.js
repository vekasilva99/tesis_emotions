import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { NavLink, withRouter } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import { BiSad } from "react-icons/bi";
import { removeError } from "../../actions/SignIn";

const CompanyNotExistPopUp = ({inputs,stateLocation,company}) => {
  const dispatch=useDispatch()
  const history =useHistory()
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const error = useSelector((state) => (state.brands.errorCompany));
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
       Oops! It looks like this company is not available.
        </h4>
      </div>
    </div>
  );
};

export default CompanyNotExistPopUp;
