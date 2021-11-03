import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/__components-dir.scss";
import polar from "../../assets/images/Polar.png";
import Item from "./item";
import Button from "../ButtonPopUp/index";
import { useParams } from "react-router-dom";
import { fetchEmotionsRequest,statPredominantEmotionRequest,emotionsInVideoRequest } from "../../actions";
const ChooseEmotionPopUp = ({
  addEmotion,
  selectedEmotions,
  settingChooseEmotion,
  open,
  videoSmall,
  setOpen
}) => {
  const { emotions } = useSelector((state) => ({
    ...state.company,
  }));
  const { video } = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    dispatch(fetchEmotionsRequest());
  }, []);
  useEffect(() => {
    dispatch(fetchEmotionsRequest());
  }, [selectedEmotions]);
  return (
    <div className={open ? "pop-up-container" : "pop-up-container closed"}>
       <div className="close-pop-up"> <h3
              onClick={() => {
          setOpen(false)
              }}
            >
              Cerrar
            </h3></div>
      <div className="pop-up-content">
        <h4>Seleccionar Emociones</h4>
        <div className="pop-up-item-container">
          {emotions.map((emotion) => {
            return <Item addEmotion={addEmotion} selectedEmotions={selectedEmotions} emotion={emotion} />;
          })}
        </div>
        <Button
          title={"Siguiente."}
          position={"right"}
          event={() => {
            if(selectedEmotions.length>0){
              videoSmall();
              settingChooseEmotion();
              // dispatch(emotionsInVideoRequest({videoID:video,emotions:selectedEmotions}));
              // dispatch(statPredominantEmotionRequest({videoID:video, emotions:selectedEmotions}))
            }
          
          }}
        />
      </div>
    </div>
  );
};

export default ChooseEmotionPopUp;
