import React, { useEffect, useState } from "react";
import "../../styles/components/__components-dir.scss";

const Sidebar = ({drawerToggleClickHandler}) => {


  return (
    <div className="sidebar-container">
        <div className="logo-container" onClick={drawerToggleClickHandler}></div>

    </div>
  );
};

export default Sidebar;