import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import { fetchEmotionsRequest, loading } from "../actions/Company";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Drawer from "../components/Drawer/index";
import AddVideoPopUp from "../components/AddVideo/index";
import UpdateEmotionPopUp from "../components/UpdateEmotion/index";
import Item from "../components/EmbeddingItem/index";
import ErrorPopUpModel from "../components/ErrorPopUpModel/index"
import Button from "../components/Button/index";
import polar from "../assets/images/Polar.png";
import "../styles/pages/__pages-dir.scss";
const EmotionDetail = (props) => {
  const dispatch = useDispatch();
  const [error, setErrorMessage] = useState(null);
  const { emotionId } = useParams();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [selectedEmbedding, setSelectedEmbedding] = useState(false);
  const [open, setOpen] = useState(false);
  const [indexi, setIndex] = useState(null);
  const { _id } = useSelector((state) => ({
    ...state.auth,
  }));
  const emotions = useSelector((state) => ({ ...state.company })).emotions.filter((emotion)=>{
return emotion._id===emotionId
  });

  const allEmotions = useSelector((state) => ({ ...state.company })).emotions
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  useEffect(() => {
    if (emotions.length === 0) {
      dispatch(fetchEmotionsRequest(_id));
    }
  }, []);

  return (
    <>
      <UpdateEmotionPopUp error={error} setErrorMessage={setErrorMessage} index={indexi} embedding={selectedEmbedding} open={open} setOpen={setOpen} />
      <Sidebar
        drawerToggleClickHandler={drawerToggleClickHandler}
        color={"#A9B18F"}
      />
      <Drawer
        color={"#A9B18F"}
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />

      <div className="app-emotions">
      {emotions.length > 0 ? (
        <>
        <h1
          className="subtitle"
          style={{ color: "#CB807D", marginTop: "0px", marginBottom: "60px" }}
        >
          {emotions[0].name}.
        </h1>
   
          <div className="emotions-container">
            {emotions[0].embeddings.map((embedding,index) => {
              return <Item           disable={error ? true :false} setIndex={setIndex} setOpen={setOpen} index={index} select={setSelectedEmbedding} embedding={embedding} />;
            })}
          </div>
          </>
        ) : null}
       
      </div>
    </>
  );
};

export default EmotionDetail;
