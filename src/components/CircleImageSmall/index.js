import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import polar from "../../assets/images/Polar.png";
const Circle = ({ drawerToggleClickHandler, video }) => {
  const history = useHistory();

  return (
    <div
      className="image-circle-small"
      onClick={() => {
        history.push(`/${video._id}/statistics`);
      }}
    >
      <img className="video-presentation-small" src={video.mainImg}></img>
      <div className="big-circle-image-small">
        <div className="small-circle-small"></div>
      </div>
    </div>
  );
};

export default Circle;
