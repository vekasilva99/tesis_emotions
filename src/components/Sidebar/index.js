import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";

const Sidebar = ({drawerToggleClickHandler,color}) => {


  return (
    <div className="sidebar-container" >
        <div className="logo-container" style={{background:color ? color:""}} onClick={drawerToggleClickHandler}></div>

    </div>
  );
};

export default Sidebar;