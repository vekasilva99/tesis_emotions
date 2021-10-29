import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/pages/__pages-dir.scss";
import {RiCloseCircleFill,RiCheckboxCircleFill} from 'react-icons/ri';
import {ImBlocked} from 'react-icons/im';
import { blockVideoRequest,unblockVideoRequest} from "../../actions/Admin";
import Circle from "../CircleVideo/index"
const Item = ({video, image}) => {
  const dispatch = useDispatch()
const history = useHistory()


  return (
    <div className="request-item-video">
      <Circle video={video}/>
      <div className="company-name-container">
      <h3 className="company-name-big">{video.name}</h3>
      <h3 className="company-name-small">{video.name}</h3>
      </div>
    
    {/* <h4 className="company-date">{company.email}</h4> */}
    <div className="company-buttons">
   
    <ImBlocked className= {video.active ? "company-block" :"company-block blocked"} onClick={()=>{if(video.active){
      dispatch(blockVideoRequest(video))
    }else{
      dispatch(unblockVideoRequest(video))
    }}}/>

    </div>
  </div>
  );
};

export default Item;
