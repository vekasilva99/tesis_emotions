import React, { useEffect, useState } from "react";
import {NavLink, withRouter} from 'react-router-dom';
import "../../styles/components/__components-dir.scss";
import { VscClose } from 'react-icons/vsc';

const Drawer= ({sideDrawerOpen,drawerToggleClickHandler,color}) => {


  return (
    <div className={sideDrawerOpen ? "drawer-container drawer-visible" :"drawer-container"} style={{background:color ? color:""}}>
      <div className="drawer-close-container"><VscClose className={color ? "close-icon green":"close-icon"} onClick={drawerToggleClickHandler}/></div>
      <div className="navlinks-container">
      <NavLink to='/' className={color ? "navlink green":"navlink"}>Home</NavLink>
      <NavLink to='/' className={color ? "navlink green":"navlink"}>Sign In</NavLink>
      <NavLink to='/' className={color ? "navlink green":"navlink"}>Sign Up</NavLink>
      <NavLink to='/' className={color ? "navlink green":"navlink"}>Join us</NavLink>
      </div>
      

    </div>
  );
};

export default Drawer;