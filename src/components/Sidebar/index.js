import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";
import menu from '../../assets/17704.png'
const Sidebar = ({drawerToggleClickHandler,color}) => {


  return (
    <div className="sidebar-container" >
        <div className="logo-container" style={{background:color ? color:""}} >
        <img className="menu-image" src={menu} onClick={drawerToggleClickHandler}></img>
        </div>

    </div>
  );
};

export default Sidebar;