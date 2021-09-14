import React, { useEffect, useState } from "react";

import "../../styles/components/__components-dir.scss";
const Item = ({company, image}) => {


  return (
<div className="item-container">
    <img src={company.mainImg} className="logo"></img>
</div>
  );
};

export default Item;
