import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";
import polar from '../../assets/images/Polar.png'
const Item = ({drawerToggleClickHandler,emotion,  addEmotion,
  selectedEmotions}) => {
<<<<<<< HEAD

  const [selected, setSelected] = useState(selectedEmotions.includes(emotion._id));
=======
    const [selected, setSelected] = useState(selectedEmotions.includes(emotion._id));
    useEffect(() => {
   setSelected(selectedEmotions.includes(emotion._id))
    }, [selectedEmotions]);

>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
  return (
    
          <div className="emotion-item-container" onClick={()=>{if(selected){setSelected(false);addEmotion(emotion._id)}else{setSelected(true);addEmotion(emotion._id)}}}>
          <img className="emotion-item-image" src={emotion.embeddings[0].img}></img>
          <div className={selected ? "emotion-item-cover pink":"emotion-item-cover"}></div>
          </div>
 
 
  );
};

export default Item;