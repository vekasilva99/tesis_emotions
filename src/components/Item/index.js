import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/components/__components-dir.scss";

const Item = ({company, image}) => {
const history = useHistory()


  return (
<div className="item-container" onClick={()=>{history.push(`/brand/${company._id}`)}}>
    <img src={company.mainImg} className="logo"></img>
</div>
  );
};

export default Item;
