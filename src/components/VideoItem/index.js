import React, { useEffect, useState } from "react";

import "../../styles/components/__components-dir.scss";
const VideoItem = ({image}) => {


  return (
<div className="video-item" >
       
       <div className="image-video-container">
       <h2 className="video-number">01</h2>
     <img src={image} className="brand"></img>
     </div>
     <h2 className="video-title-list">The Polar Bowl</h2>
     </div>
  );
};

export default VideoItem;
