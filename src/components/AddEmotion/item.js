import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";
import polar from '../../assets/images/Polar.png'
const Item = ({drawerToggleClickHandler}) => {

  const [selected, setSelected] = useState(false);
  return (
    
          <div className="emotion-item-container" onClick={()=>{if(selected){setSelected(false)}else{setSelected(true)}}}>
          <img className="emotion-item-image" src={polar}></img>
          <div className={selected ? "emotion-item-cover pink":"emotion-item-cover"}></div>
          </div>
 
 
  );
};

export default Item;