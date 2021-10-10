import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "../../styles/components/__components-dir.scss";
const VideoItem = ({image,index,video}) => {
  const history = useHistory()
const getNumber =()=>{
 if(index === 0 || index===1 || index === 2 || index===3 || index === 4 || index===5 ||  index === 6 || index===7 || index===8){
  return "0"+(index+1).toString()
 }
  return index+1

}

const { id} = useParams();

  return (
<div className="video-item"  >
       
       <div className="image-video-container">
       <h2 className="video-number">{getNumber()}</h2>
     <img src={video.mainImg} className="brand" onClick={()=>{(history.push(`/brand/${id}/${video._id}`))}}></img>
     </div>
     <h2 className="video-title-list">{video.name}</h2>
     </div>
  );
};

export default VideoItem;
