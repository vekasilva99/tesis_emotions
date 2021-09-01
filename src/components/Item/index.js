import React, { useEffect, useState } from "react";

import "../../styles/components/__components-dir.scss";
const Item = ({image}) => {


  return (
<div className="item-container">
    <img src={image} className="logo"></img>
</div>
  );
};

export default Item;
