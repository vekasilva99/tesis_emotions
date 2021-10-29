import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import Circle from "../components/Circle/index";
import CircularText from "../components/CircularText/index";
import Item from "../components/ItemAdmin/index";
import ItemVideo from "../components/ItemAdminVideos/index";
import { useDispatch, useSelector } from "react-redux";
import adidasLogo from "../assets/images/adidas.png";
import benefitLogo from "../assets/images/benefit.png";
import cocaColaLogo from "../assets/images/cocaCola.png";
import lorealLogo from "../assets/images/loreal.png";
import neutrogenaLogo from "../assets/images/neutrogena.png";
import nikeLogo from "../assets/images/nike.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FaCheckCircle } from "react-icons/fa";
import {
  fetchCompaniesRequest,
  fetchAllVideosRequest,
} from "../actions/Brands";

import "../styles/pages/__pages-dir.scss";
const HomeAdmin = (props) => {
  const dispatch = useDispatch();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const companies = useSelector((state) => [...state.brands.companies]);
  const videos = useSelector((state) => [...state.brands.allVideos]);
  const user = useSelector((state) => state.auth);
  const companiesNotAccepted = useSelector((state) => [
    ...state.brands.notAccepted,
  ]);
  const loaderAdmin = useSelector((state) => state.admin.loader);
  const loaderCompanies = useSelector((state) => state.brands.loader);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };
  useEffect(() => {
    dispatch(fetchCompaniesRequest());
  }, []);
  useEffect(() => {
    dispatch(fetchAllVideosRequest());
  }, []);

  const getWelcome = () => {
    var today = new Date();
    let time = today.getHours();

    if (time < 12 && time >= 5) {
      return "Buenos días, ";
    } else if (time >= 12 && time < 18) {
      return "Buenas tarder, ";
    } else if (time >= 18) {
      return "Buenas noches, ";
    } else {
      return "Buenas noches, ";
    }
  };
  return (
    <>
      {loaderAdmin || loaderCompanies ? (
        <div className="full-page-loader">
          <CircularProgress size={100} thickness={5} />
        </div>
      ) : null}
      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />

      <div className="app-home-admin">
        <div className="welcome-container">
          <h1>{getWelcome()}</h1>
          <h2>{user.full_name}</h2>
        </div>
        <div className="admin-container">
          <div className="admin-col">
            <div className="admin-request">
              <div className="title-request">
                <h2>Solicitudes de Marcas</h2>
              </div>
              {companiesNotAccepted.length > 0 ? (
                <div className="request-container">
                  {companiesNotAccepted.map((company) => {
                    return <Item company={company} />;
                  })}
                </div>
              ) : <div className="request-container">
              <h4 className="no-content">No hay solicitudes pendientes</h4>
              </div>}
            </div>
          </div>
          <div className="admin-col-big">
            <div className="admin-request-video">
              <div className="title-request">
                <h2>Videos</h2>
              </div>
              {videos.length > 0 ? (
                <div className="request-container">
                  {videos.map((video) => {
                    return <ItemVideo video={video} />;
                  })}
                </div>
              ) : <div className="request-container">
                <h4 className="no-content">No hay videos disponibles</h4>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;