import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import ArcText from "arc-text";
import AddVideoPopUp from "../components/AddVideo/index";
import AddEmotionPopUp from "../components/AddEmotion/index";
import Item from "../components/ItemEmotion/index";
import Button from "../components/Button/index";
import Heading from "../components/Heading/index";
import { fetchEmotionsRequest, loading } from "../actions/Company";
import { fetchVideosRequest } from "../actions/Brands";
import polar from "../assets/images/Polar.png";
import Circle from "../components/CircleImageSmall/index";
import { BiHappy } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import "../styles/pages/__pages-dir.scss";
import "@webpunk/circular-text";

const AllVideos = (props) => {
  const dispatch = useDispatch();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const { _id } = useSelector((state) => ({
    ...state.auth,
  }));
  const state = useSelector((state) => ({
    ...state.auth,
  }));
  const videos = useSelector((state) => ({ ...state.brands })).videos;

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };




  useEffect(() => {
    if (videos.length === 0) {
      dispatch(fetchVideosRequest(_id));
    }
  }, []);


  return (
    <>
     
      <AddVideoPopUp open={openVideo} setOpen={setOpenVideo} />
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
      <h1
          className="subtitle"
          style={{ color: "#CB807D", marginTop: "0px", marginBottom: "60px" }}
        >
          Videos.
        </h1>

    

        {videos.length > 0 ? (
          <div className="emotions-home-section" >
    

            <div className="videos-home-container">
              {videos.map((video) => {
                return <Circle video={video} />;
              })}
            </div>
          </div>
        ) : null}
         <Button
          event={() => {
            setOpenVideo(true);
          }}
          title={"Agregar Video."}
          position={"right"}
        />
      </div>
    </>
  );
};

export default AllVideos;