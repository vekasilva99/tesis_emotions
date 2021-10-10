import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import { useParams } from "react-router-dom";
import VideoItem from "../components/VideoItem/index";
import Button from "../components/Button/index";
import { useDispatch, useSelector } from "react-redux";
import polar from "../assets/images/Polar.png";
import { fetchVideosRequest } from "../actions/Brands";
import CompanyNotExistPopUp from "../components/CompanyNotExist";
import "../styles/pages/__pages-dir.scss";
const BrandDetail = (props) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const { id } = useParams();
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const { selectedCompany, videos, loader } = useSelector((state) => ({
    ...state.brands,
  }));

  const changeInput = (name, event) => {
    let fields = inputFields;
    var item = inputFields.find(function (input, index) {
      if (input.name == name) fields[index].value = event;
      setInputFields(fields);
    });
  };
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 600);
    }
  }, []);
  useEffect(() => {
    dispatch(fetchVideosRequest(id));
  }, []);
  const [inputFields, setInputFields] = useState([
    {
      name: "The Polar Bowl",
      image: "company name",
    },
    {
      name: "The Polar Bowl",
      image: "company name",
    },
    {
      name: "The Polar Bowl",
      image: "company name",
    },
    {
      name: "The Polar Bowl",
      image: "company name",
    },
  ]);

  return (
    <>
    <CompanyNotExistPopUp/>
      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
      {selectedCompany && videos.length > 0 ? (
        <div className="app-videos">
          <h1
            className={visible ? "subtitle" : "subtitle-onload"}
            style={{ marginTop: "0px", marginBottom: "60px", color: "white" }}
          >
            {selectedCompany.full_name}.
          </h1>
          <div
            className={visible ? "videos-container" : "videos-container-onload"}
          >
            {videos.map((video, index) => {
              return <VideoItem image={polar} video={video} index={index} />;
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BrandDetail;
