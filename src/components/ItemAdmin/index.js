import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/pages/__pages-dir.scss";
import {RiCloseCircleFill,RiCheckboxCircleFill} from 'react-icons/ri';
import { acceptCompanyRequest,rejectCompanyRequest } from "../../actions/Admin";

const Item = ({company, image}) => {
  const dispatch = useDispatch()
const history = useHistory()


  return (
    <div className="request-item">
    <h3 className="company-name">{company.full_name}</h3>
    {/* <h4 className="company-date">{company.email}</h4> */}
    <div className="company-buttons">
   
      <RiCloseCircleFill className="company-deny" onClick={()=>{dispatch(rejectCompanyRequest({_id:company._id}))}}/>
      <RiCheckboxCircleFill  className="company-accept"  onClick={()=>{dispatch(acceptCompanyRequest({_id:company._id}))}} />
    </div>
  </div>
  );
};

export default Item;
